define([
  'lib/easel',
  'class/base/BaseObject'
  ], function(createjs,BaseObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function GameState(name,statemachine) {
    this.m_name = name;
    this.m_statemachine = statemachine;
    this._type = "GameState";
    this.initalize();
  }
  
  var p = createjs.extend(GameState, BaseObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.BaseObject_isType(type); 
    }
  } ;
  
  p.initalize = function() {
    
  } ;

  p.Enter = function () {
    
  } ;
  
  p.Exit = function () {
    
  } ;
  
  p.Pause = function () {
    
  } ;
  
  p.Resume = function() {
    
  } ;

  p.Swipe = function(direction,ev) {
    
  } ;
  
  p.Update = function(time_elapsed) {       
    
  };

  createjs.GameState = createjs.promote(GameState, "BaseObject");
  return GameState;
}); 