define([
  'lib/easel',
  'class/scene/objects/SceneObject'
  ], function(createjs,SceneObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function SceneLayer() {
    this.SceneObject_constructor();
    this._type = "SceneLayer";
  }
  
  var p = createjs.extend(SceneLayer, SceneObject);
 
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.SceneObject_isType(type); 
    }
  } ; 
  
  p.initalize = function(data){
  
  } ;
  
 
  createjs.SceneLayer = createjs.promote(SceneLayer,"SceneObject");
  return SceneLayer;
}); 