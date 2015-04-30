define([
  'lib/easel',
  'class/state/GameState',
  'class/service/SceneService',
  ], function(createjs,GameState,SceneService) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoEntryState(statemachine) {
    this.GameState_constructor("DemoEntryState",statemachine);
    this.waitingtime = 5;
  }
  
  var p = createjs.extend(DemoEntryState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
  
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
    var stage = SceneService.getInstance().stage;
    stage.removeChild(this.page);
  } ;
  
  createjs.DemoEntryState = createjs.promote(DemoEntryState, "GameState");
  return createjs.DemoEntryState;
}); 