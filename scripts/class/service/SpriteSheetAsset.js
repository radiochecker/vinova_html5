define([
  'lib/easel',
  'class/base/BaseObject',
  'class/base/GameDefine'
  ], function(createjs,BaseObject,DEFINE) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function SpriteSheetAsset() {
    this.type = DEFINE.ASSET_TYPE.SPRITESHEET;
  }
  
  var p = createjs.extend(SpriteSheetAsset, BaseObject);

  p.initalize = function(requestdata,result){
    var spritemap = {
      images : [ "assets/"+ requestdata.src ],
      frames : {
        width  : requestdata.width,
        height : requestdata.height
      }
    };
    this.spritesheet = new createjs.SpriteSheet(spritemap);
  }

  createjs.SpriteSheetAsset = createjs.promote(SpriteSheetAsset, "BaseObject");
  return SpriteSheetAsset;
}); 