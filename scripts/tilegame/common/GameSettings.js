define(
function() {
  var _settings = {
    TRACKING_SETTING:{
      GOOGLE_ACCOUNT:'UA-XXXXX-X'
    } ,
    
    SCENE_SETTING:{
      CANVAS_NAME:"demoCanvas",
      FULLSCREEN: true,
      WIDTH:750,
      HEIGHT:1035
    },
      
    BOX2D_SETTING:{
      PTM:40,
      DEBUG: true
    },
              
    PRELOAD_ASSETS : [
        {src: "image1.png", id: "grant",type:"spritesheet", width:20, height:20},
        {src: "button_sprite_max.png", id: "buttondemo",type:"spritesheet", width:180, height:30},
        {src: "loading.jpg", id: "loading", type:"bitmap"}
    ]
    
  };
  return _settings;
}); 