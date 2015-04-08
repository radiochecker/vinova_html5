define([
  'lib/easel',
  'class/state/GameState',
  "class/social/SocialService",
  "class/social/operation/InitSocialOperation",
  "class/social/operation/LoginSocialOperation",
  'class/base/GameDefine'
  ], function(createjs,GameState,SocialService,InitSocialOperation,LoginSocialOperation,DEFINE) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DemoFacebookState(statemachine) {
    this.GameState_constructor("DemoFacebookState",statemachine);
  }
  
  var p = createjs.extend(DemoFacebookState, GameState);

  p.Enter = function () {
    this.GameState_Enter();
    
    var network = SocialService.getInstance().GetNetwork(DEFINE.SOCIAL_TYPE.FACEBOOK);
   
    var op = new InitSocialOperation(DEFINE.SOCIAL_TYPE.FACEBOOK,{appid:"515497108548955"},this,this.initcallback);
    
    SocialService.getInstance().AddOperation(op);
  } ;
  
  p.initcallback = function(res,response,caller){
    
    var loginop = new LoginSocialOperation(DEFINE.SOCIAL_TYPE.FACEBOOK,{},caller,caller.logincallback);
    SocialService.getInstance().AddOperation(loginop);
  };
  
  p.logincallback = function(res,response,caller){
    alert("git");
  };
    
  p.Exit = function () {
    this.GameState_Exit();
  } ;
  
  createjs.DemoFacebookState = createjs.promote(DemoFacebookState, "GameState");
  return createjs.DemoFacebookState;
}); 