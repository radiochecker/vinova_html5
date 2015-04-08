define([
  'lib/box2d_v.2.3.1_min',
  'class/base/GameLog'
  ], function(box2d,Log) {
  
  var _box2d_helper ={};	
  

  //to replace original C++ operator =
  _box2d_helper.copyVec2 = function(vec) {
      return new Box2D.b2Vec2(vec.get_x(), vec.get_y());
  } ;

  //to replace original C++ operator * (float)
  _box2d_helper.scaleVec2 = function(vec, scale) {
      vec.set_x( scale * vec.get_x() );
      vec.set_y( scale * vec.get_y() );            
  } ;

  //to replace original C++ operator *= (float)
  _box2d_helper.scaledVec2 = function(vec, scale) {
      return new Box2D.b2Vec2(scale * vec.get_x(), scale * vec.get_y());
  } ;
  
 
  // http://stackoverflow.com/questions/12792486/emscripten-bindings-how-to-create-an-accessible-c-c-array-from-javascript
  _box2d_helper.createChainShape = function(vertices, closedLoop) {
      var shape = new Box2D.b2ChainShape();            
      var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
      var offset = 0;
      for (var i=0;i<vertices.length;i++) {
          Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
          Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
          offset += 8;
      }            
      var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
      if ( closedLoop )
          shape.CreateLoop(ptr_wrapped, vertices.length);
      else
          shape.CreateChain(ptr_wrapped, vertices.length);
      return shape;
  } ;

  _box2d_helper.createPolygonShape = function(vertices) {
      var shape = new Box2D.b2PolygonShape();            
      var buffer = Box2D.allocate(vertices.length * 8, 'float', Box2D.ALLOC_STACK);
      var offset = 0;
      for (var i=0;i<vertices.length;i++) {
          Box2D.setValue(buffer+(offset), vertices[i].get_x(), 'float'); // x
          Box2D.setValue(buffer+(offset+4), vertices[i].get_y(), 'float'); // y
          offset += 8;
      }            
      var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
      shape.Set(ptr_wrapped, vertices.length);
      return shape;
  } ;
  
  _box2d_helper.createRectangleShape = function(width,height) {
    
      var verts = [];
      verts.push( new Box2D.b2Vec2( 0, 0) );
      verts.push( new Box2D.b2Vec2( width,0) );
      verts.push( new Box2D.b2Vec2( width,height) );
      verts.push( new Box2D.b2Vec2( 0, height) );
        
      return _box2d_helper.createPolygonShape(verts);
  } ;

  _box2d_helper.createRandomPolygonShape = function(radius) {
      var numVerts = 3.5 + Math.random() * 5;
      numVerts = numVerts | 0;
      var verts = [];
      for (var i = 0; i < numVerts; i++) {
          var angle = i / numVerts * 360.0 * 0.0174532925199432957;
          verts.push( new Box2D.b2Vec2( radius * Math.sin(angle), radius * -Math.cos(angle) ) );
      }            
      return _box2d_helper.createPolygonShape(verts);
  } ;
    
  return _box2d_helper;
}); 