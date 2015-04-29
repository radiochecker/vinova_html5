define([
  'lib/easel',
  'class/service/ResourceService',
  'class/scene/objects/SceneObject',
  ], function(createjs,ResourceService,SceneObject) {
  
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
  function GameObject() {
    this.SceneObject_constructor();
    this._type = "GameObject";
   
  }
  
  var p = createjs.extend(GameObject,SceneObject);
  
  p.isType = function(type){
    if(type == this._type){
      return true;
    }else{
      return this.SceneObject_isType(type);
    }
  } ;
  
  p.initalize = function(data){
     
     var spritesheet = new createjs.Sprite(ResourceService.getInstance().GetAsset("character").spritesheet);
     
     this.character = new createjs.BitmapAnimation(spritesheet);
     
     this.character.x = 0;
     this.character.y = 0;
     this.character.gotoAndPlay('idle'); 
     this.addChild(this.character); 

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
  
  p.onMouseDown = function(e){
    alert("click the scene object");
  };
  
  p.AddComponent = function(comp){
    comp.initalize(this);
    this._components.push(comp);
  }

  createjs.SceneObject = createjs.promote(SceneObject, "Container");
  return SceneObject;
}); 