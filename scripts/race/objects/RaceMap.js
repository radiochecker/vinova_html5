define([
  'lib/easel',
  'class/service/ResourceService',
  'class/service/SceneService',
  'class/scene/objects/SceneObject',
  'race/objects/RoadSegment',
  'class/utils/MathTool'
  ], function(createjs,ResourceService,SceneService,SceneObject,RoadSegment,MathTool) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RaceMap() {
    this.SceneObject_constructor();
    this._type = "RaceMap";
    this._segments      = [];                      // array of road segments
    this._roadWidth     = 2000;                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
    this._segmentLength = 200;                     // length of a single segment
    this._rumbleLength  = 3;                       // number of segments per red/white rumble strip
    this._trackLength   = null;                    // z length of entire track (computed)
    this._lanes         = 2;                       // number of lanes


    this._cameraHeight           = 700;      // z height of camera
    this._drawDistance           = 150;      // number of segments to draw
    this._fieldOfView            = 100;      // angle (degrees) for field of view
    this._fogDensity             = 2;           
    this._cameraDepth            = 1 / Math.tan((this._fieldOfView/2) * Math.PI/180);
        
    this.COLORS = {
      FOG:  '#005108',
      LIGHT:  { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC'  },
      DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB', lane: '#CCCCCC'  },
      START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
      FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
    };
    
    this.ROAD = {
      LENGTH: { NONE: 0, SHORT:  25, MEDIUM:  50, LONG:  100 },
      CURVE:  { NONE: 0, EASY:    2, MEDIUM:   4, HARD:    6 },
      HILL:   { NONE: 0, LOW:    20, MEDIUM:  30, HIGH:   40 },
    };
   
  }
  
  var p = createjs.extend(RaceMap,SceneObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.SceneObject_isType(type);
    }
  } ;
  
  p.initalize = function(data, controller){
     
    this._segments = [];
    
    this.buildRoadMap(data);
    /*for(var n = 0 ; n < 500 ; n++) {          
        var seg = new RoadSegment();
        seg.index = n;
        seg.p1 = { world: { z:  n   *this._segmentLength }, camera: {}, screen: {} };
        seg.p2 = { world: { z: (n+1)*this._segmentLength }, camera: {}, screen: {} };
        seg.color = Math.floor(n/this._rumbleLength)%2 ? this.COLORS.DARK : this.COLORS.LIGHT;
        seg.map = this;
        this._segments.push(seg);
    }*/
    
    var carsegment = controller.GetPlayer()._playerSegment;
    
    this._segments[carsegment + 2].color = this.COLORS.START;
    this._segments[carsegment + 3].color = this.COLORS.START;
      
    for(var n = 0 ; n < this._rumbleLength ; n++)
      this._segments[this._segments.length-1-n].color = this.COLORS.FINISH;

    this._trackLength = this._segments.length * this._segmentLength;
   
    this._controller = controller;

  } ;
  
  p.buildRoadMap = function(data){
      this.addStraight(this.ROAD.LENGTH.SHORT/4);
      this.addSCurves();
      //this.addLowRollingHills();
      this.addStraight(this.ROAD.LENGTH.LONG);
      this.addCurve(this.ROAD.LENGTH.MEDIUM, this.ROAD.CURVE.MEDIUM,this.ROAD.HILL.LOW);
      this.addCurve(this.ROAD.LENGTH.LONG, this.ROAD.CURVE.MEDIUM,this.ROAD.HILL.LOW);
      //this.addLowRollingHills();
      this.addStraight();
      this.addSCurves();
      this.addCurve(this.ROAD.LENGTH.LONG, -this.ROAD.CURVE.MEDIUM, this.ROAD.HILL.LOW);
      this.addCurve(this.ROAD.LENGTH.LONG, this.ROAD.CURVE.MEDIUM, this.ROAD.HILL.LOW);
      this.addStraight();
      this.addSCurves();
      this.addCurve(this.ROAD.LENGTH.LONG, -this.ROAD.CURVE.EASY,this.ROAD.HILL.LOW);
  } ;
  
  p.FindSegment = function(z) {
      return this._segments[Math.floor(z/this._segmentLength) % this._segments.length];
  };
    
  p.GetSegmentWithIndex = function(z) {
      return  this._segments[ z % this._segments.length];
  };
  
  p.Update = function(dt, controller){
    this._playerX = controller.GetPlayer()._playerX;
  
    
    this._playerbaseSegment = this.FindSegment(controller.GetPlayer()._position);
    this._playerSegment = controller.GetPlayer()._playerSegment;
  } ;
  
   p.Draw = function(ctx){

      
      var width       = SceneService.getInstance().getCanvasWidth();
      var height      = SceneService.getInstance().getCanvasHeight();
      
      var player = this._controller.GetPlayer();
      
      var baseSegment = this._playerbaseSegment;
  
      var basePercent   = MathTool.percentRemaining(player._position, this._segmentLength);
      var playerSegment = player._playerSegment;
      var playerPercent = MathTool.percentRemaining(player._position+ player._playerZ, this._segmentLength);
      var playerY       = MathTool.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
      var maxy          = height;

      var x  = 0;
      var dx = - (baseSegment.curve * basePercent);

  
      var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;

      for(n = 0 ; n < this._drawDistance ; n++) {

        segment        = this._segments[(baseSegment.index + n) % this._segments.length];
        var looped = segment.index < baseSegment.index;
        segment.fog    = MathTool.exponentialFog(n/this._drawDistance, this._fogDensity);
        segment.clip   = maxy;

        MathTool.project(segment.p1, (player._playerX * this._roadWidth) - x,      playerY + this._cameraHeight, 
                        player._position - (looped ? this._trackLength : 0),
                        this._cameraDepth, width, height, this._roadWidth);
        MathTool.project(segment.p2, (player._playerX * this._roadWidth) - x - dx, playerY + this._cameraHeight,
                         player._position - (looped ? this._trackLength : 0),
                          this._cameraDepth, width, height, this._roadWidth);

        x  = x + dx;
        dx = dx + segment.curve;

        if ((segment.p1.camera.z <= this._cameraDepth)         || // behind us
            (segment.p2.screen.y >= segment.p1.screen.y) || // back face cull
            (segment.p2.screen.y >= maxy))                  // clip by (already rendered) hill
          continue;

        
        segment.DrawSegment(ctx, width, this._lanes,
                       segment.fog, this.COLORS.FOG);

        
                       
       

        maxy = segment.p1.screen.y;
      }
    }
    
  p.DrawSimple = function(ctx){
    
      var maxy        = SceneService.getInstance().getCanvasHeight();
      var width       = SceneService.getInstance().getCanvasWidth();
      var height      = SceneService.getInstance().getCanvasHeight();
      
      var n, segment;

      for(n = 0 ; n < this._drawDistance ; n++) {

        segment        = this.GetSegmentWithIndex(this._playerbaseSegment.index + n) ;
        
        var looped = segment.index < this._playerbaseSegment.index;
        var fog    = MathTool.exponentialFog(n/this._drawDistance, this._fogDensity);

        MathTool.project(segment.p1, (this._playerX * this._roadWidth), this._cameraHeight, this._playerPosition - (looped ? this._trackLength : 0), this._cameraDepth, width, height, this._roadWidth);
        
        
        MathTool.project(segment.p2, (this._playerX * this._roadWidth), this._cameraHeight, this._playerPosition - (looped ? this._trackLength : 0), this._cameraDepth, width, height, this._roadWidth);

        if ((segment.p1.camera.z <= this._cameraDepth) || // behind us
            (segment.p2.screen.y >= maxy))          // clip by (already rendered) segment
          continue;

        segment.DrawSegment(ctx, width, this._lanes,
                       fog, this.COLORS.FOG);

        maxy = segment.p2.screen.y;
      }
  } ;
  
  p.lastY = function() { 
    return (this._segments.length == 0) ? 0 : this._segments[this._segments.length-1].p2.world.y; 
  } ;
 
  p.addStraight = function(num) {
    num = num || this.ROAD.LENGTH.MEDIUM;
    this.addRoad(num, num, num, 0, 0);
  } ;

  p.addHill = function(num, height) {
    num    = num    || this.ROAD.LENGTH.MEDIUM;
    height = height || this.ROAD.HILL.MEDIUM;
    this.addRoad(num, num, num, 0, height);
  } ;
  
  p.addCurve = function(num, curve, height) {
    num    = num    || this.ROAD.LENGTH.MEDIUM;
    curve  = curve  || this.ROAD.CURVE.MEDIUM;
    this.addRoad(num, num, num, curve, height);
  } ;
      
  p.addSCurves = function() {
    this.addRoad(this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM,  -this.ROAD.CURVE.EASY,   this.ROAD.HILL.NONE);
    this.addRoad(this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM,   this.ROAD.CURVE.MEDIUM, this.ROAD.HILL.MEDIUM);
    this.addRoad(this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM,   this.ROAD.CURVE.EASY,   this.ROAD.HILL.LOW);
    this.addRoad(this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM,  -this.ROAD.CURVE.EASY,   this.ROAD.HILL.MEDIUM);
    this.addRoad(this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM, this.ROAD.LENGTH.MEDIUM,  -this.ROAD.CURVE.MEDIUM, this.ROAD.HILL.NONE);
  } ;
  
  p.addDownhillToEnd = function(num) {
    num = num || 200;
    this.addRoad(num, num, num, -this.ROAD.CURVE.EASY, -this.lastY()/this.segmentLength);
  } ;
  
  p.addLowRollingHills = function(num, height) {
    num    = num    || this.ROAD.LENGTH.SHORT;
    height = height || this.ROAD.HILL.LOW;
    this.addRoad(num, num, num,  0,  height/2);
    this.addRoad(num, num, num,  0, -height);
    this.addRoad(num, num, num,  0,  height);
    this.addRoad(num, num, num,  0,  0);
    this.addRoad(num, num, num,  0,  height/2);
    this.addRoad(num, num, num,  0,  0);
  } ;
  
  p.addDownhillToEnd = function(num) {
    num = num || 200;
    this.addRoad(num, num, num, -this.ROAD.CURVE.EASY, -this._lastY()/this._segmentLength);
  } ;
  
  p.addRoad = function(enter, hold, leave, curve, y) {
      var startY   = this.lastY();
      var endY     = startY + (MathTool.toInt(y, 0) * this._segmentLength);
      
      var n, total = enter + hold + leave;
      for(n = 0 ; n < enter ; n++)
        this.addSegment(MathTool.easeIn(0, curve, n/enter), MathTool.easeInOut(startY, endY, n/total));
      for(n = 0 ; n < hold  ; n++)
        this.addSegment(curve, MathTool.easeInOut(startY, endY, (enter+n)/total));
      for(n = 0 ; n < leave ; n++)
        this.addSegment(MathTool.easeInOut(curve, 0, n/leave), MathTool.easeInOut(startY, endY, (enter+hold+n)/total));
    
      return;
   } ;
   
   p.addSegment = function(curve,y) {
        var seg = new RoadSegment(); 
        var n = this._segments.length;
        seg.index = n;
        seg.p1 = { world: {y: this.lastY(), z:  n   *this._segmentLength }, camera: {}, screen: {} };
        seg.p2 = { world: {y: y, z: (n+1)*this._segmentLength }, camera: {}, screen: {} };
        seg.color = Math.floor(n/this._rumbleLength)%2 ? this.COLORS.DARK : this.COLORS.LIGHT;
        seg.path = this;
        seg.curve = curve;

        this._segments.push(seg);
     
    };
  

  
 
  
  

  
 
  createjs.RaceMap = createjs.promote(RaceMap, "SceneObject");
  return RaceMap;
}); 