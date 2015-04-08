define([
  'lib/easel',
  'class/social/operation/SocialOperation',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(createjs,SocialOperation,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
   
  function LoginSocialOperation(socialtype,data,caller,callback) {
    this.SocialOperation_constructor(socialtype,caller,callback);
    this.type="LoginSocialOperation";
    this._data = data;
    
  }
  
  var p = createjs.extend(LoginSocialOperation, SocialOperation);

  p.Execute = function(){
    var network = createjs.SocialService.getInstance().GetNetwork(this._sns);
    if(network.IsLoggedIn()){
      this.endoperation(DEFINE.OPERATION_RESULT.SUCCESS,{});
    }else{
      network.Login(this._data,this,this._onLoginCallback);
    }
    this.SocialOperation_Execute();
  } ;
  
  p._onLoginCallback = function(result,response,caller){
    caller.endoperation(result,response);
  } ;
  
  p.endoperation = function(result, response){
    this.SocialOperation_endoperation(result,response);
  } ;
 
  createjs.LoginSocialOperation = createjs.promote(LoginSocialOperation, "SocialOperation");
  return LoginSocialOperation;
}); 