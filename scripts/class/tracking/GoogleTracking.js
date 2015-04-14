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
  }
  
  var p = createjs.extend(GoogleTracking, BaseObject);

  p.initalize = function(accountid){
    this._gaq = window._gaq;
    this._gaq.push(['_setAccount', accountid]);
    this._gaq.push(['_trackPageview']);
  } ;
  
  p.addevent = function(eventdata,data){
    this._gaq.push(['_trackEvent','video',"play","this is a test"]);
  };


  createjs.GoogleTracking = createjs.promote(GoogleTracking, "BaseObject");
  return GoogleTracking;
}); 
