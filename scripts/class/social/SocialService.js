define([
  'class/social/FacebookNetwork',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(FacebookNetwork,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
    createjs = window.createjs;
  }
  
  var _social_service_instance;	
  
  function SocialService() {
    this.name = "rest";
    this.networkmap ={};
    this.operationQueue = [];
    this.currentOperation = null;
  }
  
  var p = SocialService.prototype;
  
  p.initalize = function(appid){
   
  } ;
  
  p.Update = function(time_elapsed) {
    if(this.currentOperation != null ){
      this.currentOperation.Update(time_elapsed);
      if(this.currentOperation.IsFinished()){
        this.currentOperation = null;
      }
    }
    
    if(this.currentOperation == null && this.operationQueue.length > 0){
      this.currentOperation = this.operationQueue.shift();
      this.currentOperation.Execute();
    }
  };
  
  p.AddOperation = function(operation){
    this.operationQueue.push(operation);
  }
  
  p.GetNetwork = function(networktype){
    if(!this.networkmap.hasOwnProperty(networktype)){
      if(networktype == DEFINE.SOCIAL_TYPE.FACEBOOK){
         this.networkmap[networktype] =  new FacebookNetwork();
      }
    }
    return this.networkmap[networktype];
  } ;

  function createInstance() {
    var _social_service_instance = new SocialService();
    _social_service_instance.initalize();
    return _social_service_instance;
  }
  
  SocialService.getInstance = function(){
    if(_social_service_instance == null){
        _social_service_instance = createInstance();
    }
    return _social_service_instance;
  } ;
  
  createjs.SocialService = SocialService;
  return SocialService;
}); 