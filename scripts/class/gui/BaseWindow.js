define([
    'lib/easel',
    'class/gui/GuiElement'
    ], function(createjs,GuiElement) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function BaseWindow(label, color) {
      this.GuiElement_constructor();
      this._name = "null";
    }
    
    var p = createjs.extend(BaseWindow, createjs.GuiElement);
    
    p.isType = function(type){
      if(type == "BaseWindow"){
        return true;
      }
      return this.GuiElement_isType(type);
    } ;   
    
    p.GetElement = function(name,type){
      var object = this.getChildByName(name);
      if(type == null)
        return object;
      if(object && object.isType(type)){
        return object;
      }
      return null;
    } ;
    
    p.get_name = function(){
      return this._name;
    } ;
    
    p.initalize = function() {
    } ;

    p.handleRoll = function(event) {       
      
    };

    window.BaseWindow = createjs.promote(BaseWindow, "GuiElement");
    return window.BaseWindow;
}); 