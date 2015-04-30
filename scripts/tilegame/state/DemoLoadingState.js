define([
  'lib/easel',
  'class/state/GameState',
  'class/service/SceneService',
  'class/gui/GuiService',
  'class/service/ResourceService',
  'tilegame/common/GameSettings',
  'tilegame/gui/LoadingWindow'
  ], function(createjs,GameState,SceneService,GuiService,ResourceService,SETTINGS,LoadingWindow) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoLoadingState(statemachine) {
    this.GameState_constructor("DemoLoadingState",statemachine);
  }
  
  var p = createjs.extend(DemoLoadingState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    
    this.window = GuiService.getInstance().AddWindow(LoadingWindow);
    
    /* var stage = SceneService.getInstance().stage;
    var bk = new createjs.Shape();
    bk.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, SceneService.getInstance().get_width(),SceneService.getInstance().get_height());
    bk.x = 0;
    bk.y = 0;
    
    var text = new createjs.Text("Loading...", "20px Arial", "#000");
    text.textBaseline = "top";
    text.textAlign = "center";
    text.x = SceneService.getInstance().get_width()/2;
    text.y = SceneService.getInstance().get_height()/2 - text.getMeasuredHeight()/2;
    
    this.page.addChild(bk,text);
    
    stage.addChild(this.page);*/
     
    this.waitingtime = 5000;
    ResourceService.getInstance().PreloadAndCacheAssets(SETTINGS.PRELOAD_ASSETS,this,
      function(result,data,caller){
        //caller.statemachine.ChangeState("DemoSplashingState");
      }
    );
  } ;
  
  p.Update = function(time_elapsed){
    this.waitingtime -= time_elapsed;
    if(this.waitingtime < 0){
       this.m_statemachine.ChangeState("DemoGameState");
    }
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
    GuiService.getInstance().RemoveWindow(this.window);
    //var stage = SceneService.getInstance().stage;
    //stage.removeChild(this.page);
  } ;
  
  createjs.DemoLoadingState = createjs.promote(DemoLoadingState, "GameState");
  return createjs.DemoLoadingState;
}); 