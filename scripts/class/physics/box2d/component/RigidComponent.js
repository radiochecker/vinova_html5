define([
  'lib/easel',
  'lib/box2d_v.2.3.1_min',
  'class/physics/box2d/Box2dHelper',
  'class/physics/box2d/component/Box2DComponent'
  ], function(createjs,box2d,Box2DHelper,Box2DComponent) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RigidComponent(manager,data) {
    this._manager = manager;
    this._type = "RigidComponent";
  }
  
  var p = createjs.extend(RigidComponent, Box2DComponent);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.Box2DComponent_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
    var bd = new Box2D.b2BodyDef();
   
    bd.set_type(Module.b2_dynamicBody);
   
    
    bd.set_position(this.SceneToBox2dPos(obj,this._manager.GetPTM()));
    
    var body = this._manager.GetWorld().CreateBody(bd);
    
    body.CreateFixture(Box2DHelper.createRectangleShape(obj.get_width()/this._manager.GetPTM(),obj.get_height()/this._manager.GetPTM()), 1.0);
    
    
    body.SetLinearVelocity(new Box2D.b2Vec2(0, 0));
    body.SetAwake(1);
    body.SetActive(1);
    
    this._manager.RegisterUpdate(obj,body);
   
  }

   
  p.SceneToBox2dPos = function(sceneobj,PTM) {
      return new Box2D.b2Vec2(sceneobj.get_x()/PTM,sceneobj.get_y()/PTM);
  } ;

  createjs.RigidComponent = createjs.promote(RigidComponent, "Box2DComponent");
  return RigidComponent;
}); 