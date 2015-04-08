define( function() {
    
  function TmxSetting() {
    this.tilewidth = 1;
    this.tileheight = 1;
  }
  
  var p = TmxSetting.prototype;

  p.initalize = function(mapdata) {
    this.tilewidth = mapdata.tilewidth;
    this.tileheight = mapdata.tileheight;
  } ;

  createjs.TmxSetting = TmxSetting;
  return TmxSetting;
}); 