define([
    'lib/easel'
    ], function(createjs) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function BaseWindow(label, color) {
      this.Container_constructor();
      this._name = "null";
    }
    
    var p = createjs.extend(BaseWindow, createjs.Container);

    p.get_name = function(){
      return this._name;
    } ;
    
    p.initalize = function() {
    } ;

    p.handleRoll = function(event) {       
      
    };

    window.BaseWindow = createjs.promote(BaseWindow, "Container");
    return window.BaseWindow;
}); 