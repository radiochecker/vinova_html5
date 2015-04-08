define([
  'lib/easel',
  'lib/preload',
  'class/service/ServiceBase',
  'class/base/GameDefine',
  'class/base/GameLog',
  'class/service/AssetLoadRequest',
  'class/service/SpriteSheetAsset',
  'class/service/BitmapAsset'
  ], function(createjs,preloader,ServiceBase,DEFINE,Log,AssetLoadRequest,SpriteSheetAsset,BitmapAsset) {
  
  if (typeof createjs === 'undefined' ) {
    createjs = window.createjs;
  }
  
  var _resource_service_instance;	
  
  function ResourceService() {
    this.name = "rest";
    this.requestQueue = [];
    this.currentRequest = null;
    this.preloader = null;
    this.initalize();
    this._assetsmap = {};
  }
  
  var p = createjs.extend(ResourceService,ServiceBase);
  
  p.initalize = function(setting){
    
    this.ServiceBase_initalize(setting);
     
    if(this.preloader == null){
      this.preloader = new createjs.LoadQueue();     
      this.preloader.addEventListener("complete", this.handleFileComplete);
    }
      
  } ;
  
  p._LoadManifest = function(type,assetmanifest,callback,caller){
    var request = new AssetLoadRequest(type,assetmanifest,callback,caller);
    this.requestQueue.push(request);
  } ;
  
  p.LoadAssetsList = function(assetmanifest,caller,callback){
    this._LoadManifest("assets",assetmanifest,callback,caller);
  } ;
    
  p.LoadJson = function(filepath,caller,callback){
     this._LoadManifest("json",{src:filepath, id : "jsonfile"},callback,caller);
  } ;
  
  p.PreloadAndCacheAssets = function(assetmanifest,caller,callback){
    this._LoadManifest("cache",assetmanifest,callback,caller);
  }

  p.OnFileComplete = function(result,event){  
      if(this.currentRequest != null){
        switch(this.currentRequest._type){
          case "assets":
            this.currentRequest.FireCallback(result,this.preloader);
            break;
          case "json": 
            this.currentRequest.FireCallback(result,this.preloader.getResult("jsonfile"));
            break;
          case "cache": 
            this.CacheLoadedAssets(this.currentRequest,this.preloader);
            this.currentRequest.FireCallback(result,this.preloader);
            break;
          default:
            break;
        }
        this.currentRequest = null;
      }
  } ;
  
  p.CacheLoadedAssets = function(request, loader){
    for(var index = 0; index < request._dataset.length; index++){
      var obj = request._dataset[index];
      
      if(this._assetsmap.hasOwnProperty(obj.id)){
        Log.LogError("the id"+ obj.id +"has been used in the asset map");
        continue;
      }
      
      if(obj.type == DEFINE.ASSET_TYPE.SPRITESHEET){
        var sasset= new SpriteSheetAsset();
        sasset.initalize(obj,loader.getResult(obj.id));
        this._assetsmap[obj.id]  = sasset;
      }else if(obj.type == DEFINE.ASSET_TYPE.BITMAP){
        var sbit = new BitmapAsset();
        sbit.initalize(obj,loader.getResult(obj.id));
        this._assetsmap[obj.id] = sbit;
      }else{
        Log.LogError("can not find the asset type");
      }
    }
  } ;
  
  p.GetAsset = function(id,type){
    if(this._assetsmap.hasOwnProperty(id)){
      if(type == null || type == this._assetsmap[id].type){
         return this._assetsmap[id];
      }
    }
    return null;
  };
  
  p.handleFileComplete = function(event) {
     ResourceService.getInstance().OnFileComplete(0,event);
  } ;
  
  p.handleFileProgress = function(event) {
        
  } ;

  p.handleOverallProgress = function(event) {
    Log.LogInfo('TOTAL: '+ this.preloader.progress);
  } ;

  p.handleFileError = function(event) {
    Log.LogError('no file loaded');
    ResourceService.getInstance().OnFileComplete(1,event);
  } ;
  
  p.Update = function(time_elapsed) {
    if(this.currentRequest == null && this.requestQueue.length > 0){
      this.currentRequest = this.requestQueue.shift();
      var loadlist = [];
      for(var i =0; i< this.currentRequest._dataset.length; i++){
        loadlist.push({id:this.currentRequest._dataset[i].id,src:this.currentRequest._dataset[i].src});
      }
      this.preloader.loadManifest(loadlist, true, "assets/");
    }
  };

  
  function createInstance() {
    var _resource_service_instance = new ResourceService();
    return _resource_service_instance;
  }
  
  ResourceService.getInstance = function(){
    if(_resource_service_instance == null){
        _resource_service_instance = createInstance();
    }
    return _resource_service_instance;
  } ;
  
  createjs.ResourceService = createjs.promote(ResourceService, "ServiceBase");
  return ResourceService;
}); 