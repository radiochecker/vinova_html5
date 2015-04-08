define([
  'lib/easel',
  "class/state/StateMachine",
  'class/service/ServiceBase',
  "class/base/GameLog",
  'tilegame/state/DemoLoadingState',
  'tilegame/state/DemoSplashingState',
  'tilegame/state/DemoEntryState',
  'tilegame/state/DemoBox2dState'
  ], function(createjs,StateMachine,ServiceBase,Log,DemoLoadingState,DemoSplashingState,DemoEntryState,DemoBox2dState) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
  var _gamestate_service_instance;	
  
  function GameStateService() {
    this.name = "rest";
  }
  
  var p =  createjs.extend(GameStateService,ServiceBase);
  
  p.initalize = function(setting){
    
    this.ServiceBase_initalize(setting);
    
    this.stateMachine = new StateMachine();
    this.stateMachine.initalize([
      DemoLoadingState,DemoSplashingState,DemoEntryState,DemoBox2dState
    ]);
    Log.LogInfo("initalize the game state service");
    this.stateMachine.PushState(setting.startstate);
  } ;
  
  p.Update = function(time_elapsed){
    this.stateMachine.Update(time_elapsed);
  } ;

  function createInstance() {
    var _gamestate_service_instance = new GameStateService();
    return _gamestate_service_instance;
  }
  
  GameStateService.getInstance = function(){
    if(_gamestate_service_instance == null){
       _gamestate_service_instance = createInstance();
    }
    return _gamestate_service_instance;
  } ;
  
  createjs.GameStateService = createjs.promote(GameStateService, "ServiceBase");
  return GameStateService;
}); 