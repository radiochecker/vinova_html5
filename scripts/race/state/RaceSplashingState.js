define([
  'lib/easel',
  'class/state/GameState',
  'class/service/ResourceService',
  'class/service/SceneService',
  'race/gui/EntryWindow',
  'class/gui/GuiService',
  ], function(createjs,GameState,ResourceService,SceneService,EntryWindow,GuiService) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceSplashingState(statemachine) {
    this.GameState_constructor("RaceSplashingState",statemachine);
    this.waitingtime = 5;
  }
  
  var p = createjs.extend(RaceSplashingState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    this.window = GuiService.getInstance().AddWindow(EntryWindow);
    var button = this.window.GetGUIElement("next","BaseButton");
    if(button){
      button.AddClickEvent(this,function(caller,e){
        caller.m_statemachine.ChangeState("RaceGameState");
      });
    }
    
    
  } ;
  
  p.Update = function(time_elapsed){
    
  } ;
  
  p.Tap = function(ev){
    GuiService.getInstance().HandleEvent(ev);
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
    GuiService.getInstance().RemoveWindow(this.window);
  } ;
  
  createjs.RaceSplashingState = createjs.promote(RaceSplashingState, "GameState");
  return createjs.RaceSplashingState;
}); 