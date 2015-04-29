define([
  'lib/easel',
  'lib/hammer.min',
  "class/state/StateMachine",
  'class/service/ServiceBase',
  "class/base/GameDefine",
  "class/base/GameLog",
  'tilegame/state/DemoLoadingState',
  'tilegame/state/DemoSplashingState',
  'tilegame/state/DemoEntryState',
  'tilegame/state/DemoGameState',
  'tilegame/state/DemoBox2dState',
  "tilegame/common/GameSettings",
  
  ], function(createjs,Hammer,StateMachine,ServiceBase,DEFINE,Log,DemoLoadingState,DemoSplashingState,DemoEntryState,DemoGameState,DemoBox2dState,SETTINGS) {
  
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
      DemoLoadingState,DemoSplashingState,DemoEntryState,DemoBox2dState,DemoGameState
    ]);
    Log.LogInfo("initalize the game state service");
    this.stateMachine.PushState(setting.startstate);
    
    var myElement = document.getElementById(SETTINGS.SCENE_SETTING.CANVAS_NAME);
    var mc = new Hammer(myElement);
    
    mc.get('pinch').set({enable:true});
    mc.get('rotate').set({enable:true});
    
    mc.get('pan').set({direction:Hammer.DIRECTION_ALL});
    mc.get('swipe').set({direction:Hammer.DIRECTION_ALL});
    
    var context = this;
    
    mc.on("swipeleft", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.LEFT,ev);
      ev.gesture.preventDefault();
    });
    
    mc.on("swiperight", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.RIGHT,ev);
      ev.gesture.preventDefault();
    });
    
    mc.on("swipeup", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.UP,ev);
      ev.gesture.preventDefault();
    });
    
    mc.on("swipedown", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.DOWN,ev);
      ev.gesture.preventDefault();
    });
    
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