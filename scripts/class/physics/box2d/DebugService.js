define([
  'lib/box2d_v.2.3.1_min',
  'class/service/SceneService',
  'class/physics/box2d/Box2dHelper',
  'class/base/GameLog'
  ], function(box2d,SceneService,Box2DHelper,Log) {
  
  var _debug_draw ={};	
  

  _debug_draw.drawAxes = function(ctx) {
      var ctx = SceneService.getInstance().getContext2D();
      ctx.strokeStyle = 'rgb(192,0,0)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(1, 0);
      ctx.stroke();
      ctx.strokeStyle = 'rgb(0,192,0)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 1);
      ctx.stroke();
  };

  _debug_draw.setColorFromDebugDrawCallback = function(color) {  
      var context = SceneService.getInstance().getContext2D();
      var col = Box2D.wrapPointer(color, Box2D.b2Color);
      var red = (col.get_r() * 255)|0;
      var green = (col.get_g() * 255)|0;
      var blue = (col.get_b() * 255)|0;
      var colStr = red+","+green+","+blue;
      context.fillStyle = "rgba("+colStr+",0.5)";
      context.strokeStyle = "rgb("+colStr+")";
  } ;

  _debug_draw.drawSegment = function(vert1, vert2) {
      var context = SceneService.getInstance().getContext2D();
      var vert1V = Box2D.wrapPointer(vert1, Box2D.b2Vec2);
      var vert2V = Box2D.wrapPointer(vert2, Box2D.b2Vec2);                    
      context.beginPath();
      context.moveTo(vert1V.get_x(),vert1V.get_y());
      context.lineTo(vert2V.get_x(),vert2V.get_y());
      context.stroke();
  } ;

  _debug_draw.drawPolygon = function(vertices, vertexCount, fill) {
      var context = SceneService.getInstance().getContext2D();
      context.beginPath();
      for(tmpI=0;tmpI<vertexCount;tmpI++) {
          var vert = Box2D.wrapPointer(vertices+(tmpI*8), Box2D.b2Vec2);
          if ( tmpI == 0 )
              context.moveTo(vert.get_x(),vert.get_y());
          else
              context.lineTo(vert.get_x(),vert.get_y());
      }
      context.closePath();
      if (fill)
          context.fill();
      context.stroke();
  };

  _debug_draw.drawCircle = function(center, radius, axis, fill) {   
      var context = SceneService.getInstance().getContext2D();
      var centerV = Box2D.wrapPointer(center, Box2D.b2Vec2);
      var axisV = Box2D.wrapPointer(axis, Box2D.b2Vec2);
      
      context.beginPath();
      context.arc(centerV.get_x(),centerV.get_y(), radius, 0, 2 * Math.PI, false);
      if (fill)
          context.fill();
      context.stroke();
      
      if (fill) {
          //render axis marker
          var vert2V = Box2DHelper.copyVec2(centerV);
          vert2V.op_add( Box2DHelper.scaledVec2(axisV, radius) );
          context.beginPath();
          context.moveTo(centerV.get_x(),centerV.get_y());
          context.lineTo(vert2V.get_x(),vert2V.get_y());
          context.stroke();
      }
  };

  _debug_draw.drawTransform = function(transform) {
      var context = SceneService.getInstance().getContext2D();
      var trans = Box2D.wrapPointer(transform,Box2D.b2Transform);
      var pos = trans.get_p();
      var rot = trans.get_q();
      
      context.save();
      context.translate(pos.get_x(), pos.get_y());
      context.scale(0.5,0.5);
      context.rotate(rot.GetAngle());
      context.lineWidth *= 2;
      _debug_draw.drawAxes(context);
      context.restore();
  };

  _debug_draw.getCanvasDebugDraw = function(){
    
    var debugDraw = new Box2D.JSDraw();

    debugDraw.DrawSegment = function(vert1, vert2, color) {
        _debug_draw.setColorFromDebugDrawCallback(color);
        _debug_draw.drawSegment(vert1, vert2);
    };

    debugDraw.DrawPolygon = function(vertices, vertexCount, color) {
        _debug_draw.setColorFromDebugDrawCallback(color);
        _debug_draw.drawPolygon(vertices, vertexCount, false);
    };

    debugDraw.DrawSolidPolygon = function(vertices, vertexCount, color) {
        _debug_draw.setColorFromDebugDrawCallback(color);
        _debug_draw.drawPolygon(vertices, vertexCount, true);
    };

    debugDraw.DrawCircle = function(center, radius, color) {
        _debug_draw.setColorFromDebugDrawCallback(color);
        var dummyAxis = Box2D.b2Vec2(0,0);
        _debug_draw.drawCircle(center, radius, dummyAxis, false);
    };

    debugDraw.DrawSolidCircle = function(center, radius, axis, color) {
        _debug_draw.setColorFromDebugDrawCallback(color);
        _debug_draw.drawCircle(center, radius, axis, true);
    };

    debugDraw.DrawTransform = function(transform) {
        _debug_draw.drawTransform(transform);
    };

    return debugDraw;
  }
  
  return _debug_draw;
}); 