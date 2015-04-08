define([
  'lib/easel',
  'class/base/BaseComponent'
  ], function(createjs,BaseComponent) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function TouchComponent(data) {
    this._type = "TouchComponent";
  }
  
  var p = createjs.extend(TouchComponent, BaseComponent);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.BaseComponent_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
      // no need to update the static object
    obj.addEventListener("mousedown",function(e){
      obj.onMouseDown(e);
    });
  }

  createjs.TouchComponent = createjs.promote(TouchComponent, "BaseComponent");
  return TouchComponent;
}); 
