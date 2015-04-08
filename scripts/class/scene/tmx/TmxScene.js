define([
    'lib/easel',
    'class/scene/tmx/TmxTileSet',
    'class/scene/tmx/TmxTileLayer',
    'class/scene/tmx/TmxSetting',
    'class/service/ResourceService'
    ], function(createjs,TmxTileSet,TmxTileLayer,TmxSetting,ResourceService) {
  
    if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
    }
  
    function TmxScene() {
      this.Container_constructor();
      this.rootpath = "";
           
      this.tileset = null;
      this.tilesetting = null;
      
      this.initalize();
    }
    var p = createjs.extend(TmxScene, createjs.Container);

    p.initalize = function() {
      
    } ;
  
    p.LoadJson = function(filepath){
      var context = this;
      var patharray = filepath.split('/');
      patharray.pop();
      this.rootpath = patharray.join('/');
      ResourceService.getInstance().LoadJson(filepath,this,
        function(result,mapdata,caller){
          
          caller.tileset = new TmxTileSet();
          caller.tileset.initalize(caller.rootpath,mapdata.tilesets[0]);
          
          caller.tilesetting = new TmxSetting();
          caller.tilesetting.initalize(mapdata);  
          caller.tileset.addEventListener(TmxTileSet.TILESETS_LOADED,function(type,data){
            caller.initLayers(mapdata,caller.tileset);
          });
         }
      );
    };
    
    p.initLayers = function(data,tileset){
      for (var idx = 0; idx < data.layers.length; idx++) {
        var layerData = data.layers[idx];
        if (layerData.type == 'tilelayer'){
          var tilelayer = new TmxTileLayer();
          var result = tilelayer.initalize(layerData, tileset, this.tilesetting);
          if(result == true){
            this.addChild(tilelayer);
          }
        }
      }
    } ;

  
    createjs.TmxScene = createjs.promote(TmxScene, "Container");
    return createjs.TmxScene;
}); 