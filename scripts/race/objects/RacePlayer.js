define([
  'lib/easel',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/scene/objects/SceneObject',
  'class/utils/MathTool',
  ], function(createjs,ResourceService,SceneService,SceneObject,MathTool) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RacePlayer() {
    this.SceneObject_constructor();
    this._type = "RacePlayer";
    this._playerX       = 0;                       // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
    this._playerZ       = null;                    // player relative z distance from camera (computed)
    this._position      = 0;                       // current camera Z position (add playerZ to get player's absolute Z position)
    this._speed         = 0;                       // current speed
    this._maxSpeed      = 200*30;                  // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
    this._accel         =  this._maxSpeed/5;             // acceleration rate - tuned until it 'felt' right
    this._breaking      = -this._maxSpeed;               // deceleration rate when braking
    this._decel         = -this._maxSpeed/5;             // 'natural' deceleration rate when neither accelerating, nor braking
    this._offRoadDecel  = -this._maxSpeed/2;             // off road deceleration is somewhere in between
    this._offRoadLimit  =  this._maxSpeed/4;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
    this._centrifugal   = 0.27;                     // centrifugal force multiplier when going around curves
  
  
    this._roadWidth     = 2000;                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
    this._segmentLength = 200;                     // length of a single segment
    this._playerSegment = 0;

    this._steerHorizental = 0;  // -1 is left; 1 is right
    this._steerAccelerate = 0;  // -1 is decelerate; 1 is accelerate
    
    this.SPRITES = {
      PLAYER_STRAIGHT:        { x:    0,   y:     25, w:  424, h:   73 },
      PLAYER_LEFT:            { x:    0,   y:    137, w:  424, h:   73 },
      PLAYER_RIGHT:           { x:    0,   y:    244, w:  424, h:   73 },
      PLAYER_UPHILL_LEFT:     { x:    0,   y:    137, w:  424, h:   73 },
      PLAYER_UPHILL_STRAIGHT: { x:    0,   y:     25, w:  424, h:   73 },
      PLAYER_UPHILL_RIGHT:    { x:    0,   y:    244, w:  424, h:   73 }
    };
  }
  
  var p = createjs.extend(RacePlayer,SceneObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.SceneObject_isType(type);
    }
  } ;
  
  p.initalize = function(data){
    this._image = ResourceService.getInstance().GetAsset("sprite").bitmap;
    
    this._position = 0;
    this._speed = 0;
    this._playerX = 0;
  } ;
  
  p.Accelerate = function(_var){
    if(_var < 0)
      this._steerAccelerate = -1;
    else if(_var > 0)
      this._steerAccelerate = 1;
    else
      this._steerAccelerate = 0;
  };
  
  p.Steer = function(_var){
    if(_var < 0)
      this._steerHorizental = -1;
    else if(_var > 0)
      this._steerHorizental = 1;
    else
      this._steerHorizental = 0;
  };
  
  p.Update = function(dt,controller){

      this._playerZ   = (controller.GetMap()._cameraHeight * controller.GetMap()._cameraDepth);
      this._playerSegment = controller.GetMap().FindSegment(this._position + this._playerZ);
      
      var playerSegment = this._playerSegment;   
      var speedPercent  = this._speed/this._maxSpeed;
        
      this._position = MathTool.increase(this._position, dt * this._speed, controller.GetMap()._trackLength);

      var dx = dt * 2 * (this._speed/this._maxSpeed); // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
      
      if (this._steerHorizental < 0)
        this._playerX = this._playerX - dx;
      else if (this._steerHorizental > 0)
        this._playerX = this._playerX + dx;
    
      this._playerX = this._playerX - (dx * speedPercent * playerSegment.curve * this._centrifugal);

      
      if (this._steerAccelerate < 0)
        this._speed = MathTool.accelerate(this._speed, this._breaking, dt);
      else if (this._steerAccelerate > 0)
        this._speed = MathTool.accelerate(this._speed, this._accel, dt);
      else
        this._speed = MathTool.accelerate(this._speed, this._decel, dt);

      
      if ((this._playerX < -1) || (this._playerX > 1)) {

        if (this._speed > this._offRoadLimit)
            this._speed = MathTool.accelerate(this._speed, this._offRoadDecel, dt);
        
        //this.handleOffRoadCollision(playerSegment);
      
      }
    
      ///this.handleCarCollision(playerSegment);


      this._playerX = MathTool.limit(this._playerX, -1.25, 1.25);     // dont ever let player go too far out of bounds
      this._speed   = MathTool.limit(this._speed, 0, this._maxSpeed); // or exceed maxSpeed

  } ;
  
  p.Draw = function(ctx){

      var playerSegment = this._playerSegment;
      var playerPercent = MathTool.percentRemaining(this._position+this._playerZ, this._segmentLength);
      
      var width       = SceneService.getInstance().getCanvasWidth();
      var height      = SceneService.getInstance().getCanvasHeight();
      var resolution  = height/480;
      
      this.DrawPlayer(ctx, width, height, resolution, this._roadWidth, this._image.image, this._speed/this._maxSpeed,
                this._cameraDepth/this._playerZ,
                width/2,
                (height/2) - (this._cameraDepth/this._playerZ * 
                MathTool.interpolate( playerSegment.p1.camera.y, 
                                      playerSegment.p2.camera.y, 
                                      playerPercent) * height/2),
                this._speed * this._steerHorizental,
                playerSegment.p2.world.y - playerSegment.p1.world.y);

  } ;
  
  p.DrawPlayer = function(ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown) {

    var bounce = (1.5 * Math.random() * speedPercent * resolution) * MathTool.randomChoice([-1,1])+5;
    var sprite;
    if (steer < 0)
      sprite = (updown > 0) ? this.SPRITES.PLAYER_UPHILL_LEFT : this.SPRITES.PLAYER_LEFT;
    else if (steer > 0)
      sprite = (updown > 0) ? this.SPRITES.PLAYER_UPHILL_RIGHT : this.SPRITES.PLAYER_RIGHT;
    else
      sprite = (updown > 0) ? this.SPRITES.PLAYER_UPHILL_STRAIGHT : this.SPRITES.PLAYER_STRAIGHT;
    
    //adjust scale here
    this.DrawSprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale*0.4, destX, destY + bounce, -0.5, -1);
  };
  
  p.DrawSprite = function(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {

                    //  scale for projection AND relative to roadWidth (for tweakUI)
    var destW  = (sprite.w * scale * width/2) * (this.SPRITES.SCALE * roadWidth);
    var destH  = (sprite.h * scale * width/2) * (this.SPRITES.SCALE * roadWidth);

    destX = destX + (destW * (offsetX || 0));
    destY = destY + (destH * (offsetY || 0));

    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH)
      ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), destX, destY, destW, destH - clipH);

  } ;
 
  createjs.RacePlayer = createjs.promote(RacePlayer, "SceneObject");
  return RacePlayer;
}); 