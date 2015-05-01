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
    this.waitingtime = 5;
  }
  
  var p = createjs.extend(DemoSplashingState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    this.window = GuiService.getInstance().AddWindow(EntryWindow);
    var button = this.window.GetGUIElement("next","BaseButton");
    if(button){
      button.AddClickEvent(this,function(caller,e){
        caller.m_statemachine.ChangeState("DemoGameState");
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
  
  createjs.DemoSplashingState = createjs.promote(DemoSplashingState, "GameState");
  return createjs.DemoSplashingState;
}); 