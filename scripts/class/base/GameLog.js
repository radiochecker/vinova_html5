define(
function() {
  var _gamelog = {};
  
  _gamelog.LogInfo = function(s){
    console.log(s);
  };
  
  _gamelog.LogError= function(s){
    console.log("Error:"+s);
    alert(s);
  };
  
  _gamelog.LogWarning = function(s){
    console.log("Warning:"+s);
  };
  
  return _gamelog;
}); 