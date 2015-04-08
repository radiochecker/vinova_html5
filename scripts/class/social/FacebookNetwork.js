define([
  'facebook',
  'jquery',
  'class/base/BaseObject',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(facebook,jquery,BaseObject,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  var _facebook_instance = null;
  
  function FacebookNetwork() {
    this.type="facebook";
    this.scope = 'installed,publish_actions,publish_stream,manage_pages,create_event',
    this._accesslist = [];
    
    this._loggedin = false;
    this._initalized = false;
    
    this._hasAllPermission = false;
    this._grantedPermission = [];
    this._appid ="";
    _facebook_instance = this;
  }
  
  var p = createjs.extend(FacebookNetwork, BaseObject);

  p.IsInitalized = function(){
    return this._initalized;
  } ;
  
  p.Initalize = function(data,caller,cb){
    FB.init({
      appId      : data.appid,
      xfbml      : true,
      version    : 'v2.1'
    });
    this._appid  = data.appid;
    var context = this;
    
    FB.getLoginStatus(this._onLoginResponse);
    FB.Event.subscribe('auth.authResponseChange', this._onAuthChange);
    this._initalized = true;
    cb(DEFINE.OPERATION_RESULT.SUCCESS,{},caller);
  } ;
  
  p.IsLoggedIn = function(){
    return this._loggedin;
  } ;
  
  p.Login = function(data,caller,cb){
    var context = this;
    FB.login(function(response){
      if(response.status == 'connected'){
        context._loggedin = true;
        if (response && response.authResponse) {
          var user_id = response.authResponse.userID;
          cb(DEFINE.OPERATION_RESULT.SUCCESS,user_id,caller);
        } 
      } else if (response.status === 'not_authorized') {
        cb(DEFINE.OPERATION_RESULT.FAILED,"",caller);
      } else {
        cb(DEFINE.OPERATION_RESULT.FAILED,"",caller);
      }
    } ,{scope: this._scope});
  } ;
  
  p.likepage = function(pageid,_func){
    return false;
  } ;
  
  p._onAuthChange = function(response) {
    
    var context = _facebook_instance;
    
    if(response.status == "connected"){
      //we need use accesstoken to exchange the page accesstoken
      context._loggedin = true;
      
      $.ajax({
          url: "https://graph.facebook.com/me/accounts?access_token="+response.authResponse.accessToken,
          context: context,
          dataType:"json"
      }).done(function(res) {
          this._accesslist = res.data;
      });
    }
  } ;

  createjs.FacebookNetwork = createjs.promote(FacebookNetwork, "BaseObject");
  return FacebookNetwork;
}); 