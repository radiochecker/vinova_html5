define([
  'lib/easel',
  'class/base/BaseObject',
  'class/base/GameDefine'
  ], function(createjs,BaseObject,DEFINE) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function BitmapAsset() {
    this.type=DEFINE.ASSET_TYPE.BITMAP;
  }
  
  var p = createjs.extend(BitmapAsset, BaseObject);

  p.initalize = function(requestdata,result){
    this.bitmap = new createjs.Bitmap("assets/"+ requestdata.src);
  }

  createjs.BitmapAsset = createjs.promote(BitmapAsset, "BaseObject");
  return BitmapAsset;
}); 