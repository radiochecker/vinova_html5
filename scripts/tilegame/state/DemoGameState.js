define([
  'lib/easel',
  "class/base/GameLog",
  "class/base/GameDefine",
  'class/state/GameState',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/gui/GuiService',
  ], function(createjs,LOG,DEFINE,GameState,ResourceService,SceneService,GuiService) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoGameState(statemachine) {
    this.GameState_constructor("DemoGameState",statemachine);
    this.waitingtime = 5;
  }
  
  var p = createjs.extend(DemoGameState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
     
  } ;
  
  p.Update = function(time_elapsed){
    
  } ;
  
  p.Swipe = function(direction,e){
    switch (direction){
      case DEFINE.DIRECTION.LEFT:
         
        break;
      case DEFINE.DIRECTION.RIGHT:
        
        break; 
      case DEFINE.DIRECTION.UP:
          
        break;
      case DEFINE.DIRECTION.DOWN:
       
        break;
      
    }
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
   
  } ;
  
  createjs.DemoGameState = createjs.promote(DemoGameState, "GameState");
  return createjs.DemoGameState;
}); 