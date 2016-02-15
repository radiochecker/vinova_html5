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
  'race/common/GameSettings',
  'race/gui/LoadingWindow',
  'jquery'
  ], function(createjs,GameState,SceneService,GuiService,ResourceService,SETTINGS,LoadingWindow,jquery) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceLoadingState(statemachine) {
    this.GameState_constructor("RaceLoadingState",statemachine);
  }
  
  var p = createjs.extend(RaceLoadingState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    
    this.window = GuiService.getInstance().AddWindow(LoadingWindow);
    
    jquery("#loading").hide();
    jquery("#"+SETTINGS.SCENE_SETTING.CANVAS_NAME).show(); 
   
    this._waitingtime = 5000;
    this._finishloadingassets = false;
    ResourceService.getInstance().PreloadAndCacheAssets(SETTINGS.PRELOAD_ASSETS,this,
      function(result,data,caller){
        caller._finishloadingassets = true;
        if(caller._waitingtime< 0){
          caller.m_statemachine.ChangeState("RaceSplashingState");
        }
      }
    );
  } ;
  
  p.Update = function(time_elapsed){
    this._waitingtime -= time_elapsed;
    if(this._waitingtime < 0 && this._finishloadingassets == true){
       this.m_statemachine.ChangeState("RaceSplashingState");
    }
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
    GuiService.getInstance().RemoveWindow(this.window);
    //var stage = SceneService.getInstance().stage;
    //stage.removeChild(this.page);
  } ;
  
  createjs.RaceLoadingState = createjs.promote(RaceLoadingState, "GameState");
  return createjs.RaceLoadingState;
}); 