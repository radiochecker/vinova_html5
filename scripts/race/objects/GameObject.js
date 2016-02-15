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
     
   
     
     this.character = new createjs.Sprite(ResourceService.getInstance().GetAsset("character").spritesheet,'down');
     
     this.character.x = 0;
     this.character.y = 0;
     this.character.gotoAndPlay('down'); 
     this.addChild(this.character); 

    this.set_x(0);
    this.set_y(0);

  } ;
  
 
  createjs.GameObject = createjs.promote(GameObject, "SceneObject");
  return GameObject;
}); 