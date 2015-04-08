define([
  'lib/easel',
  'class/base/BaseObject',
  'class/service/ServicePool',
  'class/base/GameLog'
  ], function(createjs,BaseObject,ServicePool,Log) {
  
  if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
  }
  
 
  function ServiceBase() {
    
  }
  
  var p = createjs.extend(ServiceBase, BaseObject);
  
  p.initalize = function(setting){
    ServicePool.getInstance().addService(this);
  } ;
  
  p.deinitalize = function(){
  
  } ;
  
  p.Update = function(time_elapsed){
  
  } ;
  
   
  createjs.ServiceBase = createjs.promote(ServiceBase, "BaseObject");
  return ServiceBase;
}); 