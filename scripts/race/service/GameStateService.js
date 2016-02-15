define([
  'lib/easel',
  'lib/hammer.min',
  'lib/touch-emulator',
  "class/state/StateMachine",
  'class/service/ServiceBase',
  'class/gui/GuiService',
  "class/base/GameDefine",
  "class/base/GameLog",
  'race/state/RaceLoadingState',
  'race/state/RaceSplashingState',
  'race/state/RaceGameState',
  "race/common/GameSettings",
  
  ], function(createjs,Hammer,TouchEmulator,StateMachine,ServiceBase,GuiService,DEFINE,Log,RaceLoadingState,RaceSplashingState,RaceGameState,SETTINGS) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
  var _gamestate_service_instance;	
  
  function GameStateService() {
    this.name = "GameStateService";
    TouchEmulator();
  }
  
  var p =  createjs.extend(GameStateService,ServiceBase);
  
  p.initalize = function(setting){
    
    this.ServiceBase_initalize(setting);
    
    this.stateMachine = new StateMachine();
    this.stateMachine.initalize([
      RaceLoadingState,RaceSplashingState,RaceGameState
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
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("swiperight", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.RIGHT,ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("swipeup", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.UP,ev);
       ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("swipedown", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Swipe(DEFINE.DIRECTION.DOWN,ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("tap", function(ev) {
      ev.event_name = 'click';
      var state = context.stateMachine.GetCurrentState();
      state.Tap(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("doubletap", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.DoubleTap(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("pan", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Pan(ev);
       ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("pinch", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.Pinch(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("touchstart", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.TouchStart(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });

    mc.on("touchmove", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.TouchMove(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    mc.on("touchend", function(ev) {
      var state = context.stateMachine.GetCurrentState();
      state.TouchEnd(ev);
      ev.preventDefault();
      if(ev.gesture != null){
        ev.gesture.preventDefault();
      }
    });
    
    //The below is for desktop debugging
    var getCoodinate = function(ev){
      var x;
      var y;
      var e = ev.changedTouches[0];
      if (e.pageX || e.pageY) { 
        x = e.pageX;
        y = e.pageY;
      }
      else { 
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
      } 
      x -= myElement.offsetLeft;
      y -= myElement.offsetTop;
      
      return {x:x,y:y};
    };
    
    document.body.addEventListener('touchstart', function(ev){
       ev.event_name = 'touchstart';
       ev.center= getCoodinate(ev);
       var bhandle = GuiService.getInstance().HandleEvent(ev);
        
       var state = context.stateMachine.GetCurrentState();
       state.TouchStart(ev);
       ev.preventDefault();
       if(ev.gesture != null){
         ev.gesture.preventDefault();
       }
    }, false);
    
    document.body.addEventListener('touchmove', function(ev){
       ev.event_name = 'touchmove';
       ev.center= getCoodinate(ev);
       var bhandle = GuiService.getInstance().HandleEvent(ev);
        
       var state = context.stateMachine.GetCurrentState();
       state.TouchMove(ev);
       ev.preventDefault();
       if(ev.gesture != null){
         ev.gesture.preventDefault();
       }
    }, false);
    
    document.body.addEventListener('touchend', function(ev){
       ev.event_name = 'touchend';
       ev.center= getCoodinate(ev);
       var bhandle = GuiService.getInstance().HandleEvent(ev);
       var state = context.stateMachine.GetCurrentState();
       state.TouchEnd(ev);
       ev.preventDefault();
       if(ev.gesture != null){
         ev.gesture.preventDefault();
       }
    }, false);
    
    
    
    
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