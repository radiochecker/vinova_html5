define([
  'lib/easel',
  'class/service/ServiceBase',
  'class/service/SceneService',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(createjs,ServiceBase,SceneService,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
    createjs = window.createjs;
  }
  
  var _gui_service_instance;	
  
  function GuiService() {
     this._activewindows = {};
  }
  
  var p = createjs.extend(GuiService,ServiceBase);
  
  p.initalize = function(setting){
    this._guiroot = SceneService.getInstance().getGuiLayer();
  } ;
  
  p.AddWindow = function(_windowclass){
    var win = new _windowclass();
    win.initalize();
    
    if( this._activewindows.hasOwnProperty(win.get_name())){
      Log.LogError("window has been loaded" + win.get_name());
      return this._activewindows[win.get_name()];
    }
    
    this._activewindows[win.get_name()] = win;
    this._guiroot.addChild(win);
    return win;
  };
  
  p.GetWindow = function(_windowname){
    return this._activewindows[_windowname];
  };
  
  p.RemoveWindow = function(window){
    this._guiroot.removeChild(window);
  };

  p.Update = function(time_elapsed) {
    
  };

  
  function createInstance() {
    var _gui_service_instance = new GuiService();
    return _gui_service_instance;
  }
  
  GuiService.getInstance = function(){
    if(_gui_service_instance == null){
        _gui_service_instance = createInstance();
    }
    return _gui_service_instance;
  } ;
  
  createjs.GuiService = createjs.promote(GuiService, "ServiceBase");
  return GuiService;
}); 