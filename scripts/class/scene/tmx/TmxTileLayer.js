define([
    'lib/easel',
    'class/service/SceneService'
    ], function(createjs,SceneService) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function TmxTileLayer(label, color) {
      this.Container_constructor();
      
    
    }
    var p = createjs.extend(TmxTileLayer, createjs.Container);

    p.initalize = function(mapdata,tileset,settings) {
      for ( var y = 0; y < mapdata.height; y++) {
        for ( var x = 0; x < mapdata.width; x++) {
          // create a new Bitmap for each cell
          var cellBitmap = new createjs.Sprite(tileset.tilesetSheet);
          // layer data has single dimension array
          var idx = x + y * mapdata.width;
          // tilemap data uses 1 as first value, EaselJS uses 0 (sub 1 to load correct tile)
          cellBitmap.gotoAndStop(mapdata.data[idx] - 1);
          // isometrix tile positioning based on X Y order from Tiled
          cellBitmap.x = 300 + x * settings.tilewidth/2 - y * settings.tilewidth/2;
          cellBitmap.y = y * settings.tileheight/2 + x * settings.tileheight/2;
          // add bitmap to stage
          this.addChild(cellBitmap);
        
        }
      }
      return true;
    } ;

    window.TmxTileLayer = createjs.promote(TmxTileLayer, "Container");
    return window.TmxTileLayer;
}); 