define([
  'lib/easel',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/scene/objects/SceneObject',
  'class/utils/MathTool'
  ], function(createjs,ResourceService,SceneService,SceneObject,MathTool) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceBackground() {
    this.SceneObject_constructor();
    this._type = "RaceBackground";
    this._background = null;
  }
  
  var p = createjs.extend(RaceBackground,SceneObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.SceneObject_isType(type);
    }
  } ;
  
  p.initalize = function(data){
    this._skySpeed        = 0.0003;                   // background sky layer scroll speed when going around curve (or up hill)
    this._hillSpeed       = 0.0005;                   // background hill layer scroll speed when going around curve (or up hill)
    
    this._skyOffset       = 0;                       // current sky scroll offset
    this._hillOffset      = 0;                       // current hill scroll offset
    
    this._skyYOffset      = 0;                       // current sky scroll offset
    
    this._hillYOffset     = 265;                       // current hill scroll offset
    this._curve           = 0;
    this._speedPercent    = 0;
    
    this._background = ResourceService.getInstance().GetAsset("background").bitmap;
    
    this.BACKGROUND = {
      SKY:   { x:    5, y:    5, w: SceneService.getInstance().getCanvasWidth(), h:  480 }, //640
      HILLS: { x:    5, y:  533, w: SceneService.getInstance().getCanvasWidth(), h:  480 }
    };

  } ;
  
  p.AdjustSpeed = function(curve,speedPercent){
    this._curve = curve;
    this._speedPercent = speedPercent;
  } ;
  
  p.Update = function(dt){
      this._skyOffset  = MathTool.increase(this._skyOffset,  this._skySpeed  * this._curve * this._speedPercent, 1);
      this._hillOffset = MathTool.increase(this._hillOffset, this._hillSpeed * this._curve * this._speedPercent, 1);
  } ;
  
  p.Draw = function(ctx){
    
    var width       = SceneService.getInstance().getCanvasWidth();
    var height      = SceneService.getInstance().getCanvasHeight();
    
    this.Drawbackground(ctx, this._background,width,height,this.BACKGROUND.SKY,this._skyOffset, this._skyYOffset);
    this.Drawbackground(ctx, this._background,width,height,this.BACKGROUND.HILLS,this._hillOffset, this._hillYOffset);
  } ;
  
  p.Drawbackground = function(ctx, background, width, height, layer, rotation, offset) {

    rotation = rotation || 0;
    offset   = offset   || 0;

    var imageW = layer.w/2;
    var imageH = layer.h;

    var sourceX = layer.x + Math.floor(layer.w * rotation);
    var sourceY = layer.y
    var sourceW = Math.min(imageW, layer.x+layer.w-sourceX);
    var sourceH = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW/imageW));
    var destH = height;

    ctx.drawImage(background.image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
      ctx.drawImage(background.image, layer.x, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);
  },
  
 
  createjs.RaceBackground = createjs.promote(RaceBackground, "SceneObject");
  return RaceBackground;
}); 