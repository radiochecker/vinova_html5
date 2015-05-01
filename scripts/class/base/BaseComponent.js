define([
  'lib/easel',
  'class/base/BaseObject'
  ], function(createjs,BaseObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function BaseComponent(data) {
    this._type = "BaseComponent";
  }
  
  var p = createjs.extend(BaseComponent, BaseObject);
  
  p.isType = function(type){
    if(type == "BaseComponent"){
      return true;
    }else{
      return this.BaseObject_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
      // no need to update the static object
  }

  createjs.BaseComponent = createjs.promote(BaseComponent, "BaseObject");
  return BaseComponent;
}); 