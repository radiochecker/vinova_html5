define([
  'lib/easel',
  "class/base/GameLog",
  "class/base/GameDefine",
  'class/state/GameState',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/gui/GuiService',
  'race/service/RaceGameController'
  ], function(createjs,LOG,DEFINE,GameState,ResourceService,SceneService,GuiService,RaceGameController) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceGameState(statemachine) {
    this.GameState_constructor("RaceGameState",statemachine);
    this.waitingtime = 5;
    
  }
  
  var p = createjs.extend(RaceGameState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    
    this._gameController = new RaceGameController();
    this._gameController.initalize({});
    
   
  } ;
  
  p.Update = function(time_elapsed){
    
    this._gameController.Update(time_elapsed/1000);
    
  } ;
  
  p.Tap = function(ev) {
    this._gameController.GetPlayer().Accelerate(1);
  } ;
  
  p.Press = function(ev) {
    this._gameController.GetPlayer().Accelerate(1);
  } ;
  
  p.PressUp = function(ev) {
    this._gameController.GetPlayer().Accelerate(0);
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();  
  } ;
  
  createjs.RaceGameState = createjs.promote(RaceGameState, "GameState");
  return createjs.RaceGameState;
}); 