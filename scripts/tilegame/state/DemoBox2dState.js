define([
  'lib/easel',
  'lib/hammer.min',
  "class/base/GameLog",
  'class/state/GameState',
  'class/service/SceneService',
  'class/service/ResourceService',
  'tilegame/common/GameSettings',
  'class/physics/box2d/Box2DManager',
  'class/scene/objects/SceneObject',
  'class/scene/components/TouchComponent',
  'class/scene/components/DragComponent',
  ], function(createjs,Hammer,LOG,GameState,SceneService,ResourceService,SETTINGS,Box2DManager,SceneObject,TouchComponent,DragComponent) {
  
 

  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoBox2dState(statemachine) {
    this.GameState_constructor("DemoBox2dState",statemachine);
  }
  
  var p = createjs.extend(DemoBox2dState, GameState);

  p.Enter = function () {
    this.GameState_Enter();

    Box2DManager.getInstance().initalize(SETTINGS.BOX2D_SETTING);
    
    var obj = new SceneObject();
    obj.initalize({width:50,height:50,color:"DeepSkyBlue"});
    obj.set_x(200);
    obj.set_y(20);
    obj.AddComponent(Box2DManager.getInstance().CreateComponent("RigidComponent",{}));
    obj.AddComponent(new DragComponent());
    
    var obj3 = new SceneObject();
    obj3.initalize({width:50,height:50,color:"DeepSkyBlue"});
    obj3.set_x(220);
    obj3.set_y(80);
    obj3.AddComponent(Box2DManager.getInstance().CreateComponent("RigidComponent",{}));
    obj3.AddComponent(new DragComponent());
    
    var obj2 = new SceneObject();
    obj2.initalize({width:600,height:20,color:"#ccc"});
    obj2.set_x(10);
    obj2.set_y(500);
    obj2.AddComponent(Box2DManager.getInstance().CreateComponent("StaticComponent",{}));
    obj2.AddComponent(new DragComponent());
    obj2.on("dragover",function(e){
      Box2DManager.getInstance().Activate();
    });

    SceneService.getInstance().stage.addChild(obj,obj2,obj3);
    
    var myElement = document.getElementById(SETTINGS.SCENE_SETTING.CANVAS_NAME);
    var mc = new Hammer(myElement);
    mc.on("panleft panright tap press", function(ev) {
      LOG.LogInfo(ev.type +" gesture detected.");
    });

  } ;
  
  
  p.Update = function(time_elapsed){
    Box2DManager.getInstance().Update(time_elapsed);
  } ;
  
   
  p.Exit = function () {
     Box2DManager.getInstance().deinitalize();
  } ;
  
  createjs.DemoBox2dState = createjs.promote(DemoBox2dState, "GameState");
  return createjs.DemoBox2dState;
}); 
