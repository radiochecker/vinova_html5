define([
  'lib/easel',
  'class/base/BaseComponent',
  'class/service/SceneService'
  ], function(createjs,BaseComponent,SceneService) {
  
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
    var context = this;
    this.dragging = false;
    var scale = SceneService.getInstance().getCanvasScale();
    
    obj.on("mousedown",function(evt) {
			 context.detx = evt.stageX/scale - obj.get_x();
			 context.dety = evt.stageY/scale - obj.get_y();
			 context.dragging = true;
		});
		
    obj.on("pressmove",function(evt) {
			  
				evt.currentTarget.set_x(evt.stageX/scale - context.detx);
				evt.currentTarget.set_y(evt.stageY/scale - context.dety);
		});
		
		obj.on("pressup",function(evt) {
			 
			 context.dragging = false;
		});
  }

  createjs.DragComponent = createjs.promote(DragComponent, "BaseComponent");
  return DragComponent;
}); 
