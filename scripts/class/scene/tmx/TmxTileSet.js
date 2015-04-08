define([
  'lib/easel',
  'class/service/ResourceService',
  'class/base/BaseObject'
  ], function(createjs,ResourceService,BaseObject) {

  if (typeof createjs === 'undefined' ) {
     createjs = window.createjs;
  }
  
  function TmxTileSet() {
    this.EventDispatcher_constructor();
    this.tilesetSheet = null;
  }
   
  var p = createjs.extend(TmxTileSet, createjs.EventDispatcher);

  p.initalize = function(filepath,imagedata) {
    this.dataset = imagedata;
    ResourceService.getInstance().LoadJson(filepath + "/" + imagedata.image,this,
       function(result,imgdata,caller){
        var images = {
          images : [ "assets/"+ filepath + "/" + imagedata.image ],
          frames : {
            width  : caller.dataset.tilewidth,
            height : caller.dataset.tileheight
          }
        };
        // create spritesheet
        caller.tilesetSheet = new createjs.SpriteSheet(images);
        caller.dispatchEvent(TmxTileSet.TILESETS_LOADED);
       }
    );
  } ;

  
  
  TmxTileSet.TILESETS_LOADED = "tilesets is loaded";
  
  window.TmxTileSet =  createjs.promote(TmxTileSet, "EventDispatcher");;
  return window.TmxTileSet;
}); 