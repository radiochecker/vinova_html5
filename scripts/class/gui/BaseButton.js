define([
    'lib/easel'
    ], function(createjs) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function BaseButton() {
      this.Container_constructor();
    }
    
    var p = createjs.extend(BaseButton, createjs.Container);

    p.initalizeEvents = function() {
     
      this.on("rollover", this.handleRoll);
      this.on("rollout", this.handleRoll);
      this.cursor = "pointer";
      
      this.mouseEnabled = true;
      this.mouseChildren = false;
      
    } ;
    
    p.initalizeWithJson = function(data){
      this.name = data.name;
      this.x = data.x;
      this.y = data.y;
    } ;

    p.handleRoll = function(event) {       
      
    };

    window.BaseButton = createjs.promote(BaseButton, "Container");
    return window.BaseButton;
}); 