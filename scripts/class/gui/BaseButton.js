define([
    'lib/easel',
    'class/gui/GuiElement',
    ], function(createjs,GuiElement) {
  
    if (typeof createjs === 'undefined' ) {
          createjs = window.createjs;
      }
    
    function BaseButton() {
      this.GuiElement_constructor();
      this._type = "BaseButton";
      this._eventlist = {};
    }
    
    var p = createjs.extend(BaseButton, GuiElement);

    p.isType = function(type){
      if(type == "BaseButton"){
        return true;
      }
      return this.GuiElement_isType(type);
    } ;   
    
    p.initalizeEvents = function() {
     
      this.cursor = "pointer";
      
      this.mouseEnabled = true;
      this.mouseChildren = false;
      
    } ;
    
    p.initalizeWithJson = function(data){
      this.name = data.name;
      this.x = data.x;
      this.y = data.y;
            
      //initalize the text data
      if(typeof(data.label) !== "undefined"){
        this.label = data.label;
        var textcolor = "#000";
        var size = "20px";
        var font = "Arial";
        
        if(typeof(data.textcolor) !== "undefined"){
          textcolor = data.textcolor;
        }
        if(typeof(data.size) !== "undefined"){
          size = data.size;
        }
        if(typeof(data.font) !== "undefined"){
          font = data.font;
        }
        
        this.text = new createjs.Text(this.label, size + " " + font, textcolor);
        
        this.text.textBaseline = "center";
        this.text.textAlign = "center";
        this.text.x = data.width/2;
        this.text.y = data.height/2+10;
      }
      
    } ;

    p.handleRoll = function(event) {       
      
    };
    
    p.AddClickEvent = function(caller,callback){
      this._addevent('click',{caller:caller,callback:callback});
    } ;
    
    p._addevent = function(type,obj){
      if(!this._eventlist.hasOwnProperty(type))
          this._eventlist[type] = [];
      this._eventlist[type].push(obj);
    } ;
    
    p._removeevent = function(type,caller){
      
    } ;
    
    p.AddDoubleClickEvent = function(caller,callback){
      this._addevent('doubleclick',{caller:caller,callback:callback});
    } ;
    
    p.onclick = function(evt){
      this._triggerEvent("click",evt);
    } ;
    
    p.ontouchend = function(evt){
      this._triggerEvent("click",evt);
    } ;
    
    p.HandleEvent = function(e){
      /*switch (e.type){
        case "tap":
          this._triggerEvent("click",e);
          break;
        default:
          break;
      }*/
    } ;
    
    p._triggerEvent = function(type,e){
      if(this._eventlist.hasOwnProperty(type)){
        for(var i = 0; i< this._eventlist[type].length; i++){
          var obj = this._eventlist[type][i];
          obj.callback(obj.caller,e);
        }
      }
    } ;

    window.BaseButton = createjs.promote(BaseButton, "GuiElement");
    return window.BaseButton;
}); 