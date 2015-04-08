define([
  'lib/easel'
  ], function(createjs) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function SceneObject() {
    this.Container_constructor();
    this._type = "SceneObject";
    this._components = [];
  }
  
  var p = createjs.extend(SceneObject, createjs.Container);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return false;
    }
  } ;
  
  p.initalize = function(data){
      
    this.background = new createjs.Shape();
    this.background.x = 0;
    this.background.y = 0;
    this.background.graphics.beginFill(data.color).drawRoundRect(0,0,data.width,data.height,2);
    
    this.addChild(this.background); 

    this.width = data.width;
    this.height = data.height;

    this.set_x(0);
    this.set_y(0);

  } ;
  
  p.set_x = function(val){
    this.x = val;
  } ;
  
  p.set_y = function(val){
    this.y = val;
  } ;
  
  p.set_rotation = function(val){
    this.rotation = val;
  } ;
  
  p.get_x = function(val){
    return this.x;
  } ;
  
  p.get_y = function(val){
    return this.y;
  } ;
  
  p.get_width = function(val){
    return this.width;
  } ;
  
  p.get_height = function(val){
    return this.height;
  } ;
  
  p.AddComponent = function(comp){
    comp.initalize(this);
    this._components.push(comp);
  }

  createjs.SceneObject = createjs.promote(SceneObject, "Container");
  return SceneObject;
}); 