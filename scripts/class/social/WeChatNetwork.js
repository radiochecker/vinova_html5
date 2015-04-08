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
    this._hasAllPermission = false;
    this._grantedPermission = [];
    this._appid ="";
    _facebook_instance = this;
  }
  
  var p = createjs.extend(FacebookNetwork, BaseObject);

  p.initalize = function(appid){
    FB.init({
      appId      : appid,
      xfbml      : true,
      version    : 'v2.1'
    });
    this._appid  = appid;
    var context = this;
    
    FB.getLoginStatus(this._onLoginResponse);

    FB.Event.subscribe('auth.authResponseChange', this._onAuthChange);
  } ;
  
  p.IsLoggedIn = function(){
    return this._loggedin;
  } ;
  
  p.Login = function(){
    if(! this.IsLoggedIn() || ! this._hasAllPermission){
      FB.login(this._onLoginResponse,{scope: this._scope});
    }
  } ;
  
  p.likepage = function(pageid,_func){
    return false;
  } ;
  
  p._onLoginResponse = function(response){
      
    var context = _facebook_instance;
     
    if(response.status == 'connected'){
      context._loggedin = true;
      if (response && response.authResponse) {
        var user_id = response.authResponse.userID;
        FB.api(
          "/421134541349331",
          function (response) {
            if (response && !response.error) {
            /* handle the result */
            Log.LogInfo(response);
            }
          }
        );
      } 
	  
      // acquire the granted permission
      FB.api('/me/permissions', function(permissions) {
        var hasPermission = false,
        if (permissions.data !== undefined) {
          context._grantedPermission = permissions.data;
        }
      },{scope: context._scope});
      
    } else if (response.status === 'not_authorized') {
      context._loggedin = true;
    } else {
      context._loggedin = false;
    }
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