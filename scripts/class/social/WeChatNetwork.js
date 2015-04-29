define([
  
  'jquery',
  'class/base/BaseObject',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(jquery,BaseObject,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  var _wechat_instance = null;
  
  function WeChatNetwork() {
   
  }
  
  var p = createjs.extend(WeChatNetwork, BaseObject);

  p.initalize = function(appid){
   
  } ;
  
  p.IsLoggedIn = function(){
    
  } ;
  
  p.Login = function(){
    
  } ;
  
  p.likepage = function(pageid,_func){
    return false;
  } ;
  
  p._onLoginResponse = function(response){
    
  } ;
 
  p._onAuthChange = function(response) {
    
   
  } ;

  createjs.WeChatNetwork = createjs.promote(WeChatNetwork, "BaseObject");
  return WeChatNetwork;
}); 