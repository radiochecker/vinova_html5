define([
    'lib/easel',
    'class/gui/BaseButton'
    ], function(createjs,BaseButton) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function PlainButton() {
      this.BaseButton_constructor();
    }
    var p = createjs.extend(PlainButton, BaseButton);
    
    p.isType = function(type){
      if(type == "PlainButton"){
        return true;
      }
      return this.BaseButton_isType(type);
    } ;
    
    p.initalizeWithJson = function(data) {
      this.width = data.width;
      this.height = data.height;
      
      this.BaseButton_initalizeWithJson(data);
    
      this.color = data.color;
      
       
      this.background = new createjs.Shape();
      this.background.x = 0;
      this.background.y = 0;
      this.background.graphics.beginFill(this.color).drawRoundRect(0,0,data.width,data.height,5);
      
      this.addChild(this.background, this.text); 
    
      this.initalizeEvents();

    } ;

    p.setWidth = function(value){
      this.BaseButton_setWidth(value);
    };
    
    p.setHeight = function(value){
      this.BaseButton_setHeight(value);
    };
    
    p._redraw = function(){
       this.background.graphics.beginFill(this.color).drawRoundRect(-this._width/2,-this._height/2,this._width,this._height,this.round);
    };
    
    p.handleRoll = function(event) {       
      this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    createjs.PlainButton = createjs.promote(PlainButton, "BaseButton");
    return createjs.PlainButton;
}); 