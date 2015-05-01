define([
    'lib/easel'
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
    
    var p = createjs.extend(BaseButton, createjs.GuiElement);

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
    } ;

    p.handleRoll = function(event) {       
      
    };
    
    p.AddClickEvent = function(caller,callback){
      this._addevent('click',{caller:caller,callback:callback});
    } ;
    
    p._addevent = function(type,obj){
      if(!this._eventlist.hasOwnProperty(type))
          this._eventlist[type] = [];
      this._eventlist[type].push_back(obj);
    } ;
    
    p._removeevent = function(type,caller){
      
    } ;
    
    p.AddDoubleClickEvent = function(caller,callback){
      this._addevent('doubleclick',{caller:caller,callback:callback});
    } ;
    
    p.HandleEvent = function(e){
      
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