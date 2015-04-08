define([
  'lib/easel',
  'class/base/BaseObject'
  ], function(createjs,BaseObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function Box2DComponent(data) {
    this._type = "Box2DComponent";
  }
  
  var p = createjs.extend(Box2DComponent, BaseObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.BaseObject_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
      // no need to update the static object
  }

  createjs.Box2DComponent = createjs.promote(Box2DComponent, "BaseObject");
  return Box2DComponent;
}); 