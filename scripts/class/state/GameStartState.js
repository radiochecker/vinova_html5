define([
  'lib/easel',
  'class/service/ResourceService',
  'class/state/GameState',
  'class/service/SceneService',
  'class/ui/Button',
  'lib/tween',
  'class/scene/tmx/TmxScene'
    ], function(createjs,ResourceService,GameState,SceneService,Button,Tween,TmxScene) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function GameStartState(statemachine) {
    this.GameState_constructor("GameStartState",statemachine);
    this.pagename = "testing";
    this.preloader = null;
    this.manifest = null;
  }
  
  var p = createjs.extend(GameStartState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    
    ResourceService.getInstance().LoadAssetsList([
        {src: "image1.png", id: "grant"},
        {src: "image2.jpg", id: "sky"}
        ],this,function(result,data,caller){
       var hill = new createjs.Bitmap(data.getResult("grant"));
       hill.x = 20;
       hill.y = 20;
      // SceneService.getInstance().stage.addChild(hill);
    });
    
    /*
    var circle = new createjs.Shape();
  
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    SceneService.getInstance().stage.addChild(circle);
    
    createjs.Tween.get(circle, { loop: true })
      .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
      .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
      .to({ alpha: 0, y: 225 }, 100)
      .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
      .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    */  
    
    var tmxscene = new TmxScene();
    tmxscene.LoadJson("tmx/mapdata2.json");
    SceneService.getInstance().stage.addChild(tmxscene);
  
    
  } ;
  
  p.Update = function(time_elapsed) {
    this.GameState_Update(time_elapsed);
  } ;

  createjs.GameStartState = createjs.promote(GameStartState, "GameState");
  return createjs.GameStartState;
}); 