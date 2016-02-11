/*
 this state should be the same with the html staging color
 and display the loading on the plain screen
 it will be used for caching the default assets for mainUI
*/
define([
  'lib/easel',
  'class/state/GameState',
  'class/service/SceneService',
  'class/gui/GuiService',
  'class/service/ResourceService',
  'tilegame/common/GameSettings',
  'tilegame/gui/LoadingWindow',
  'jquery'
  ], function(createjs,GameState,SceneService,GuiService,ResourceService,SETTINGS,LoadingWindow,jquery) {
  
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
    $("#loading").hide();
    $("#"+SETTINGS.SCENE_SETTING.CANVAS_NAME).show(); 
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
       this.m_statemachine.ChangeState("DemoSplashingState");
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