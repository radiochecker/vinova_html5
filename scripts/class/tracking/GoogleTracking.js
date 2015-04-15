define([
  'googleanalytics',
  'class/base/BaseObject',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(google,BaseObject,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  var _gaq = window._gaq;
  
  function GoogleTracking() {
    this._gaq = null;
    this._queue = [];
  }
  
  var p = createjs.extend(GoogleTracking, BaseObject);

  p.initalize = function(accountid){
    this._gaq = window._gaq;
    this._gaq.push(['_setAccount', accountid]);
    this._gaq.push(['_trackPageview']);
    this._waitingtime = -1;
    this._uid = this.generateUUID();
  } ;
  
  p.generateUUID = function(){
    var d = new Date().getTime();
    return d;
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  } ;
  p.addevent = function(eventdata,data){
    this._addQueue(['_trackEvent','video',"play","this is a test",this._uid]);
  };
  
  p.Update = function(time_elapsed){
    if(this._queue.length > 0){
      if(this._waitingtime < 0){
        var data = this._queue.shift();
        this._gaq.push(data);
        this._waitingtime = 1300;
        return;
      }
    }
    this._waitingtime -= time_elapsed;
  } ;
  
  p._addQueue = function(data){
    this._queue.push(data);
  } ;


  createjs.GoogleTracking = createjs.promote(GoogleTracking, "BaseObject");
  return GoogleTracking;
}); 
