define([
  'lib/easel',
  'class/base/BaseObject',
  'class/service/SceneService',
  'class/gui/GuiService',
  'race/objects/RaceBackground',
  'race/objects/RaceMap',
  'race/objects/RacePlayer'
  ], function(createjs,BaseObject,SceneService,GuiService,RaceBackground,RaceMap,RacePlayer) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceGameController(data) {
    this._type = "RaceGameController";
    this._background = null;
    this._map = null;
    this._player = null;
  }
  
  var p = createjs.extend(RaceGameController, BaseObject);
  
  p.isType = function(type){
    if(type == "RaceGameController"){
      return true;
    }else{
      return this.BaseObject_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
    
    this._background = new RaceBackground();
    this._background.initalize({});
    
    this._player = new RacePlayer();
    this._player.initalize({});
    
    this._map = new RaceMap();
    this._map.initalize({},this);
  } ;
  
  p.deinitalize = function(obj){
      // no need to update the static object
  } ;
  
  p.GetMap = function(){
    return this._map;
  } ;
  
  p.GetPlayer = function(){
    return this._player;
  } ;
  
  p.GetBackground = function(){
    return this._background;
  } ;
  
  
  p.Update  = function(time_elapsed){
    
    if(this._background)
      this._background.Update(time_elapsed, this);
    if(this._map)
      this._map.Update(time_elapsed, this);
    if(this._player)
      this._player.Update(time_elapsed, this);
    
    var ctx = SceneService.getInstance().getContext2D();
    
    if(this._background)
      this._background.Draw(ctx);
    if(this._map)
      this._map.Draw(ctx);
    if(this._player)
      this._player.Draw(ctx);
  } ;

  createjs.RaceGameController = createjs.promote(RaceGameController, "BaseObject");
  return RaceGameController;
}); 