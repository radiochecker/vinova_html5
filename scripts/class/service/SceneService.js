define([
  'lib/easel',
  'class/service/ServiceBase',
  'class/scene/layers/SceneLayer',
  'class/base/GameLog'
  ], function(createjs,ServiceBase,SceneLayer,Log) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
  var _scene_service_instance;	
  
  function SceneService() {
    this.name = "rest";
    this.stage = null;
    this._scale = 1.0;
    this._setting = null;
    
  }
  
  var p = createjs.extend(SceneService,ServiceBase);
  
  p.initalize = function(setting){
    this._setting = setting;
    this.ServiceBase_initalize(setting);
    var canvas = document.getElementById(setting.CANVAS_NAME);
    
    canvas.width  = setting.WIDTH;
    canvas.height = setting.HEIGHT;
    this._scale  = 1.0;
    if(setting.FULLSCREEN){
      //match height first
      canvas.height = window.innerHeight;
      canvas.width = window.innerHeight*setting.WIDTH/setting.HEIGHT;
      this._scale = window.innerHeight/setting.HEIGHT;
      
      if(canvas.width > window.innerWidth){
        canvas.height = window.innerWidth*setting.HEIGHT/setting.WIDTH;
        canvas.width = window.innerWidth;
        this._scale = window.innerWidth/setting.WIDTH;
      }
    }
  
    Log.LogInfo("initalize the scene service");
    this.stage = new createjs.Stage(setting.CANVAS_NAME);
    this.stage.scaleX = this.stage.scaleY = this._scale;
    Log.LogInfo("stage width " + this.stage.canvas.width);
    Log.LogInfo("stage height " + this.stage.canvas.height);
    this.stage.enableMouseOver();
    
    this._scenelayer = new SceneLayer();
    this._scenelayer.initalize();
    
    this._guilayer = new SceneLayer();
    this._guilayer.initalize();
    this.stage.addChild(this._scenelayer,this._guilayer);
  } ;
  
  p.Update = function(time_elapsed){
    this.stage.update();
  } ;
  
  p.getContext2D = function(){
    return this.stage.canvas.getContext("2d");
  } ;
  
  p.getGuiLayer = function(){
    return this._guilayer;
  } ;
  
  p.getSceneLayer = function(){
    return this._scenelayer;
  } ;

  p.getCanvasScale = function(){
    return this._scale;
  } ;
  
  p.get_width = function(){
    return this._setting.WIDTH;
  } ;
  
  p.get_height = function(){
    return this._setting.HEIGHT;
  } ;
  
  p.getCanvasWidth = function(){
    return this.stage.canvas.width;
  } ;
  
  p.getCanvasHeight = function(){
    return this.stage.canvas.height;
  } ;
   
  function createInstance() {
    var _scene_service_instance = new SceneService();
    return _scene_service_instance;
  }
  
  SceneService.getInstance = function(){
    if(_scene_service_instance == null){
      _scene_service_instance = createInstance();
    }
    return _scene_service_instance;
  } ;
  
  createjs.SceneService =  createjs.promote(SceneService, "ServiceBase");
  return SceneService;
}); 