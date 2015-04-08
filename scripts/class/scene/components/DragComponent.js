define([
  'lib/easel',
  'class/base/BaseComponent'
  ], function(createjs,BaseComponent) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function DragComponent(data) {
    this._type = "DragComponent";
  }
  
  var p = createjs.extend(DragComponent, BaseComponent);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.BaseComponent_isType(type); 
    }
  } ;
  
  p.initalize = function(obj){
      // no need to update the static object
    
    obj.on("pressmove",function(evt) {
				// currentTarget will be the container that the event listener was added to:
				evt.currentTarget.set_x(evt.stageX);
				evt.currentTarget.set_y(evt.stageY);
 
			});
  }

  createjs.DragComponent = createjs.promote(DragComponent, "BaseComponent");
  return DragComponent;
}); 
