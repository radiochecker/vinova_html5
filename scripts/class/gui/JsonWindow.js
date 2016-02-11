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
      }else if(data.hasOwnProperty("image")){
        var bitmap = ResourceService.getInstance().GetAsset(data.image,"bitmap").bitmap;
        if(bitmap != null){
          var bit = bitmap.clone(true);
          bit.name = "background";
          bit.x = 0;
          bit.y = 0;
          this.addChild(bit);
        }
      }else{
        LOG.LogError("can not create window background: no image and no color is set");
      }
      
      this.width = data.width;
      this.height = data.height;
        
    } ;
    
    p.adjustChildAlignment = function(control,data){
      if(typeof(data.width) == "undefined")
        return;  
      
      if(typeof(data.xalign) !== "undefined"){
        switch(data.xalign){
          case "left":
            break;
          case "center":
            control.x = (this.width/2 - data.width/2) + data.x;
            break;
          case "right":
            control.x = (this.width - data.width) + data.x;
            break;
          default:
            LOG.LogError("unsupported x alignment " + data.xlaign + "in window:"+ this.name);
        }
      }
      if(typeof(data.yalign) !== "undefined"){
        switch(data.yalign){
          case "top":
            break;
          case "center":
            control.y = (this.height/2 - data.height/2) + data.y;
            break;
          case "bottom":
            control.y = (this.height - data.height) + data.y;
            break;
          default:
            LOG.LogError("unsupported y alignment " + data.xlaign + "in window:"+ this.name);
        }
      }
    } ;
    
    p.parseChildElements = function(data){
      
      var button = null;
      switch(data.type){
        case "imagebutton":
          button = new ImageButton();
          break;
        case "plainbutton":
          button = new PlainButton();         
          break;
        default:
          break;
      }
      
      if(button != null){
        button.initalizeWithJson(data.property);
        this.adjustChildAlignment(button,data.property);
        //button.addEventListener("mousedown",function(e){alert("plainbutton");});
        this.addChild(button);
      }
    }

    createjs.JsonWindow = createjs.promote(JsonWindow, "BaseWindow");
    return createjs.JsonWindow;
}); 