define([
  'class/social/operation/SocialOperation',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(SocialOperation,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
   
  
  function InitSocialOperation(socialtype,data,caller,callback) {
    this.SocialOperation_constructor(socialtype,caller,callback);
    this.type="InitSocialOperation";
    this._data = data;
  }
  
  var p = createjs.extend(InitSocialOperation, SocialOperation);

  p.Execute = function(){
    var network = createjs.SocialService.getInstance().GetNetwork(this._sns);
    if(network.IsInitalized()){
      this.endoperation(DEFINE.OPERATION_RESULT.SUCCESS,{});
    }else{
      network.Initalize(this._data,this,this._onInitalizeCallback);
    }
  } ;
  
  p._onInitalizeCallback = function(result,response,caller){
    caller.endoperation(result,response);
  }
  
   
  createjs.InitSocialOperation = createjs.promote(InitSocialOperation, "SocialOperation");
  return InitSocialOperation;
}); 