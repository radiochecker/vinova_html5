define([
  'lib/easel',
  'lib/box2d_v.2.3.1_min',
  'class/physics/box2d/component/RigidComponent',
  'class/physics/box2d/component/StaticComponent',
  'class/physics/box2d/DebugService',
  'class/physics/box2d/Box2dHelper',
  'class/service/SceneService',
  'class/base/GameLog'
  ], function(createjs,box2d,RigidComponent,StaticComponent,DebugService,Box2DHelper,SceneService,Log) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
  var _box2d_manager_instance;	
  
  var e_shapeBit = 0x0001;
  var e_jointBit = 0x0002;
  var e_aabbBit = 0x0004;
  var e_pairBit = 0x0008;
  var e_centerOfMassBit = 0x0010;

  
  function Box2DManager() {
    this.name = "rest";
    this.world = null;
    this.PTM = 40;
    this.debugmode = false;
   
  }
  
  var p = Box2DManager.prototype;
  
  p.initalize = function(settings){
    
    this.PTM = settings.PTM;
    this.debugmode = settings.DEBUG;
    if ( this.world != null ) 
        Box2D.destroy(this.world);
    
    
    this.myDebugDraw = DebugService.getCanvasDebugDraw();            
    this.myDebugDraw.SetFlags(e_shapeBit);
    
    this.world = new Box2D.b2World( new Box2D.b2Vec2(0.0, 10.0) );
    this.world.SetDebugDraw(this.myDebugDraw);
    
    this._updatelist = [];
  } ;
  
  p.deinitalize = function(){
    if ( this.world != null ) 
      Box2D.destroy(this.world);
    
    this._updatelist = [];
  } ;
  
  p.Update = function(time_elapsed){
    
    if(this.world == null){
      return;
    }
    
    this.world.Step(1/60, 3, 2);
    if(this.debugmode){
      this.draw();
    }
  
    for(var i =0; i< this._updatelist.length; i++){
      var body = this._updatelist[i].body;
      var obj = this._updatelist[i].sceneobj;
      
      var pos = body.GetPosition();
      var rot = body.GetAngle();
      obj.set_x(pos.get_x()* this.PTM);
      obj.set_y(pos.get_y()* this.PTM);
      obj.set_rotation(rot*180/3.14159);
      
    }
  } ;
  
  p.CreateComponent = function(name,data){
    if(this.world == null){
      return;
    }
    switch(name){
      case "RigidComponent":
        return  new RigidComponent(this,data); 
      case "StaticComponent":
        return new StaticComponent(this,data);
    }
    return null;
  } ;
  
  p.GetWorld =function(){
    return this.world;
  } ;
  
  p.GetPTM =function(){
    return this.PTM;
  } ;
  
  p.RegisterUpdate = function(sceneobj,bd){
    this._updatelist.push({sceneobj:sceneobj,body:bd});
  }
  
  p.draw = function(){
    
    var context = SceneService.getInstance().getContext2D();
    var stagescale = SceneService.getInstance().getCanvasScale();
    //context.fillStyle = 'rgb(50,50,50)';
     
    context.save();            
    context.translate(0, 0);
    context.scale(stagescale,stagescale);                
    context.scale( this.PTM, this.PTM);
    context.lineWidth /=  this.PTM;
    
    DebugService.drawAxes(context);
    
    context.fillStyle = 'rgb(255,255,0)';
    this.world.DrawDebugData();
        
              
    context.restore();
  } ;
  
  function createInstance() {
    var _box2d_manager_instance = new Box2DManager();
    return _box2d_manager_instance;
  }
  
  Box2DManager.getInstance = function(){
    if(_box2d_manager_instance == null){
      _box2d_manager_instance = createInstance();
    }
    return _box2d_manager_instance;
  } ;
  
  createjs.Box2DManager = Box2DManager;
  return Box2DManager;
}); 