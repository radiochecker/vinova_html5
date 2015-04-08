define([
    'lib/easel',
    'class/gui/BaseWindow',
    'class/service/ResourceService',
    'class/base/GameLog',
    'class/gui/ImageButton',
    'class/gui/PlainButton'
    ], function(createjs,BaseWindow,ResourceService,LOG,ImageButton,PlainButton) {
  
    if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
    }
       
    function JsonWindow() {
      this.BaseWindow_constructor();
    }
    
    var p = createjs.extend(JsonWindow, BaseWindow);

    p.initalizeWithJson = function(configdata) {
 
      this.parseOwnProperty(configdata.property);
      for(var index = 0; index<configdata.children.length; index++){
        this.parseChildElements(configdata.children[index]);
      }
    } ;
    
    p.parseOwnProperty = function(data){
      if(data == null)
        return;
      this.x = data.x;
      this.y = data.y;
      if(data.hasOwnProperty("name")){
        this._name = data.name;
      }else{
        LOG.LogError("can not find window name");
      }
      
      if(data.hasOwnProperty("color")){
        var bk = new createjs.Shape();
        bk.name = "background";
        bk.graphics.beginFill(data.color).drawRect(0, 0, data.width,data.height);
        bk.x = 0;
        bk.y = 0;
        this.addChild(bk);
      }
      
      if(data.hasOwnProperty("image")){
        var bitmap = ResourceService.getInstance().GetAsset(data.image,"bitmap").bitmap;
        if(bitmap != null){
          var bit = bitmap.clone(true);
          bit.name = "background";
          bit.x = 0;
          bit.y = 0;
          this.addChild(bit);
        }
      }
      this.width = data.width;
      this.height = data.height;
        
    } ;
    
    p.parseChildElements = function(data){
      switch(data.type){
        case "imagebutton":
          var button = new ImageButton();
          button.initalizeWithJson(data.property);
          button.addEventListener("mousedown",function(e){alert("imagebutton");});
          this.addChild(button);
          break;
        case "plainbutton":
          var button = new PlainButton();
          button.initalizeWithJson(data.property);
          button.addEventListener("mousedown",function(e){alert("plainbutton");});
          this.addChild(button);
          break;
        default:
          break;
      }
    }

    createjs.JsonWindow = createjs.promote(JsonWindow, "BaseWindow");
    return createjs.JsonWindow;
}); 