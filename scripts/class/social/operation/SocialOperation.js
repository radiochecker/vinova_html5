define([
  'class/base/BaseObject',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(BaseObject,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
   
  function SocialOperation(sns,caller,cb) {
    this.type="socialoperation";
    this._sns = sns;
    this._cb = cb;
    this._caller = caller;
    this._bEnd = false;
  }
  
  var p = createjs.extend(SocialOperation, BaseObject);

  p.endoperation = function(result,response){
    this._bEnd = true;
    this._cb(result,response,this._caller);
  }
  
  p.Execute = function(){
    this._waitingtime = 60000;
  } ;
  
  p.Update = function(time_elapse){
    this._waitingtime -= time_elapse;
    if(this._waitingtime < 0){
      this.endoperation(DEFINE.OPERATION_RESULT.TIMEOUT,{});
    }
  };
  
  p.IsFinished = function(){
    return this._bEnd;
  }
 
  createjs.SocialOperation = createjs.promote(SocialOperation, "BaseObject");
  return SocialOperation;
}); 