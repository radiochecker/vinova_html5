define([
  'lib/easel',
  'class/base/BaseObject'
  ], function(createjs,BaseObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function RoadSegment(data) {
    this._type = "RoadSegment";
    
    this.index  = 0;
    this.p1 = null;
    this.p2 = null;
    this.color = 0;
    this.map = null;
    this.curve = 0;
    
    
  }
  
  var p = createjs.extend(RoadSegment, BaseObject);
  
  p.isType = function(type){
    if(type == "RoadSegment"){
      return true;
    }else{
      return this.BaseObject_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){

  } ;
  
  p.DrawSegment = function(ctx, width, lanes, fog, fogcolor) {
    var x1 = this.p1.screen.x;
    var y1 = this.p1.screen.y;
    var w1 = this.p1.screen.w;
    var x2 =  this.p2.screen.x;
    var y2 =  this.p2.screen.y;
    var w2 =  this.p2.screen.w;

    var r1 = this.rumbleWidth(w1, lanes),
        r2 = this.rumbleWidth(w2, lanes),
        l1 = this.laneMarkerWidth(w1, lanes),
        l2 = this.laneMarkerWidth(w2, lanes),
        lanew1, lanew2, lanex1, lanex2, lane;
    
    ctx.fillStyle = this.color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);
    
    this.DrawPolygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, this.color.rumble);
    this.DrawPolygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, this.color.rumble);
    this.DrawPolygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, this.color.road);
    
    if (this.color.lane) {
      lanew1 = w1*2/lanes;
      lanew2 = w2*2/lanes;
      lanex1 = x1 - w1 + lanew1;
      lanex2 = x2 - w2 + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
        this.DrawPolygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, this.color.lane);
    }
    
    this.DrawFog(ctx, 0, y1, width, y2-y1, fog, fogcolor);
  },
  
  p.rumbleWidth = function(projectedRoadWidth, lanes) {
     return projectedRoadWidth/Math.max(6,  2*lanes); 
  },
  
  p.DrawFog = function(ctx, x, y, width, height, fog, fogcolor) {
    if (fog < 1) {
      ctx.globalAlpha = (1-fog);
      ctx.fillStyle = fogcolor;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  },
  
  p.laneMarkerWidth = function(projectedRoadWidth, lanes) 
  { 
    return projectedRoadWidth/Math.max(32, 8*lanes); 
  };
  
  p.DrawPolygon = function(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  },
  /*p.AddCar = function(car){
       if(typeof this.path.segments[this.index].cars == "undefined")
            this.path.segments[this.index].cars = [];
            
       this.path.segments[this.index].cars.push(car);
       return
    } ;
    
    p.RemoveIndex = function(num){
        this.path.segments[this.index].cars.splice(num, 1);
    } ;*/

  createjs.RoadSegment = createjs.promote(RoadSegment, "BaseObject");
  return RoadSegment;
}); 