define([
  'lib/easel',
  'class/state/GameState',
  'class/service/ResourceService',
  'class/service/SceneService',
  'tilegame/gui/EntryWindow',
  'class/gui/GuiService',
  ], function(createjs,GameState,ResourceService,SceneService,EntryWindow,GuiService) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoSplashingState(statemachine) {
    this.GameState_constructor("DemoSplashingState",statemachine);
    this.page = new createjs.Container();
    this.waitingtime = 5;
  }
  
  var p = createjs.extend(DemoSplashingState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    var window = GuiService.getInstance().AddWindow(EntryWindow);
  
  } ;
  
  p.Update = function(time_elapsed){
    this.waitingtime -= time_elapsed;
    if(this.waitingtime < 0){
       //this.m_statemachine.ChangeState("DemoEntryState");
    }
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
    GuiService.getInstance().RemoveWindow("EntryWindow");
  } ;
  
  createjs.DemoSplashingState = createjs.promote(DemoSplashingState, "GameState");
  return createjs.DemoSplashingState;
}); 