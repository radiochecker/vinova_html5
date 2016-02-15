define([
  'lib/easel',
  'class/base/GameLog'
  ], function(createjs,Log) {
  
  if (typeof createjs === 'undefined' ) {
    createjs = window.createjs;
  }
  
  var _service_pool_instance;	
  
  function ServicePool() {
    
  }
  
  var p = ServicePool.prototype;
  
  p.initalize = function(setting){
    this._servicelist = [];
    var context = this;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(event){
       context.Update(event.delta);
    });
  } ;
  
  p.Update = function(time_elapsed){
    for(var i =0; i< this._servicelist.length; i++){
      this._servicelist[i].Update(time_elapsed);
    }
  } ;
  
  p.addService = function(service){
    this._servicelist.push(service);
  } ;
  
  p.removeService = function(service){
    for(var i =0; i< this._servicelist.length; i++){
      if(this._servicelist[i].name == service.name){
        this._servicelist.splice(i, 1);
      }
    }   
  } ;
  
  function createInstance() {
    var _service_pool_instance = new ServicePool();
    _service_pool_instance.initalize();
    return _service_pool_instance;
  }
  
  ServicePool.getInstance = function(){
    if(_service_pool_instance == null){
      _service_pool_instance = createInstance();
    }
    return _service_pool_instance;
  } ;
  
  createjs.ServicePool = ServicePool;
  return ServicePool;
}); 