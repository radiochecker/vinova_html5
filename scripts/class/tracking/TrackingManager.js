define([
  'lib/easel',
  'class/tracking/GoogleTracking',
  'class/base/GameLog'
  ], function(createjs,GoogleTracking,Log) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
  var _tracking_manager_instance;	
  
 
  function TrackingManager() {
     
  }
  
  var p = TrackingManager.prototype;
  
  p.initalize = function(settings){
    
    this._google = new GoogleTracking();
    this._google.initalize(settings.GOOGLE_ACCOUNT);
    
  } ;
  
  p.deinitalize = function(){
  
  } ;
  
  
  p.AddEvent = function(eventname,data){
    this._google.addevent(eventname,data);
  } ;
 
  function createInstance() {
    var _tracking_manager_instance = new TrackingManager();
    return _tracking_manager_instance;
  }
  
  TrackingManager.getInstance = function(){
    if(_tracking_manager_instance == null){
      _tracking_manager_instance = createInstance();
    }
    return _tracking_manager_instance;
  } ;
  
  createjs.TrackingManager = TrackingManager;
  return TrackingManager;
}); 