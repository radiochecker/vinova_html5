define([
  'lib/easel',
  'lib/box2d_v.2.3.1_min',
  'class/physics/box2d/Box2dHelper',
  'class/physics/box2d/component/Box2DComponent'
  ], function(createjs,box2d,Box2DHelper,Box2DComponent) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function StaticComponent(manager,data) {
    this._manager = manager;
    this._type = "StaticComponent";
  }
  
  var p = createjs.extend(StaticComponent, Box2DComponent);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.Box2DComponent_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
    var bd = new Box2D.b2BodyDef();
    bd.set_type(Module.b2_staticBody);
    
    bd.set_position(this.SceneToBox2dPos(obj,this._manager.GetPTM()));
    
    var body = this._manager.GetWorld().CreateBody(bd);
    
    body.CreateFixture(Box2DHelper.createRectangleShape(obj.get_width()/this._manager.GetPTM(),obj.get_height()/this._manager.GetPTM()), 1.0);
    
    // no need to update the static object
  }

  p.SceneToBox2dPos = function(sceneobj,PTM) {
      return new Box2D.b2Vec2(sceneobj.get_x()/PTM,sceneobj.get_y()/PTM);
  } ;

  createjs.StaticComponent = createjs.promote(StaticComponent, "Box2DComponent");
  return StaticComponent;
}); 