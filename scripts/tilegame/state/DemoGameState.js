define([
  'lib/easel',
  "class/base/GameLog",
  "class/base/GameDefine",
  'class/state/GameState',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/gui/GuiService',
  'tilegame/objects/GameObject'
  ], function(createjs,LOG,DEFINE,GameState,ResourceService,SceneService,GuiService,GameObject) {
  
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
    this.character = new GameObject();
    this.character.initalize({}) ;
    
    this.character.set_x(100);
    this.character.set_y(100);
    SceneService.getInstance().getSceneLayer().addChild(this.character);
  } ;
  
  p.Update = function(time_elapsed){
    
  } ;
  
  p.Swipe = function(direction,e){
    
    switch (direction){
      case DEFINE.DIRECTION.LEFT:
        this.character.set_x(0); 
        break;
      case DEFINE.DIRECTION.RIGHT:
        this.character.set_x(200); 
        break; 
      case DEFINE.DIRECTION.UP:
        this.character.set_y(0);  
        break;
      case DEFINE.DIRECTION.DOWN:
        this.character.set_y(200);
        break;
      
    }
  } ;
  
  p.Exit = function () {
    this.GameState_Exit();
   
  } ;
  
  createjs.DemoGameState = createjs.promote(DemoGameState, "GameState");
  return createjs.DemoGameState;
}); 