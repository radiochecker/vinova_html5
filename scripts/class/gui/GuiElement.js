define([
    'lib/easel'
    ], function(createjs) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function GuiElement() {
      this.Container_constructor();
      this._type="GuiElement";
    }
    
    var p = createjs.extend(GuiElement, createjs.Container);

    p.isType = function(type){
      if(type == "GuiElement"){
        return true;
      }
      return false;
    } ;   
    
    p.HandleEvent = function(e){
       return false;
    } ;

    window.GuiElement = createjs.promote(GuiElement, "Container");
    return window.GuiElement;
}); 