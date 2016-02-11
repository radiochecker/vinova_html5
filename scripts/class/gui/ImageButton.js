define([
    'lib/easel',
    'class/gui/BaseButton',
    'class/service/ResourceService'
    ], function(createjs,BaseButton,ResourceService) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    
    function ImageButton() {
      this.BaseButton_constructor();
    }
    
    var p = createjs.extend(ImageButton, BaseButton);

    p.isType = function(type){
      if(type == "ImageButton"){
        return true;
      }
      return this.BaseButton_isType(type);
    } ; 
       
    p.initalizeWithJson = function(data){
      this.width = 180;
      this.height = 30;
      
      this.BaseButton_initalizeWithJson(data);
      
      this.background = new createjs.Sprite(ResourceService.getInstance().GetAsset(data.image).spritesheet);
      this.background.x = 0;
      this.background.y = 0;
      this.background.gotoAndStop(0);
      
      this.addChild(this.background, this.text);
  
      this.initalizeEvents();  
    } ;

    p.handleRoll = function(event) {       
      if(event.type == "rollover"){
        this.background.gotoAndStop(1);
      }else{
        this.background.gotoAndStop(0);
      }
    };
    
    createjs.ImageButton = createjs.promote(ImageButton, "BaseButton");
    return createjs.ImageButton;
}); 