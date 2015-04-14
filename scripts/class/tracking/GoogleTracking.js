define([
  'googleanalytics',
  'class/base/BaseObject',
  'class/base/GameDefine',
  'class/base/GameLog'
  ], function(google,BaseObject,DEFINE,Log) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function GoogleTracking() {
 
  }
  
  var p = createjs.extend(GoogleTracking, BaseObject);

  p.initalize = function(accountid){
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', accountid]);
    _gaq.push(['_trackPageview']);
  } ;
  
  p.addevent = function(eventdata,data){
    _gaq.push(['_trackEvent','video',"play","this is a test"]);
  };


  createjs.GoogleTracking = createjs.promote(GoogleTracking, "BaseObject");
  return GoogleTracking;
}); 
