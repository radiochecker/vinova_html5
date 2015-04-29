define(
function() {
  var _settings = {
    TRACKING_SETTING:{
      GOOGLE_ACCOUNT:'UA-61692563-1'
    } ,
    
    SCENE_SETTING:{
      CANVAS_NAME:"demoCanvas",
      FULLSCREEN: true,
      WIDTH:350,
      HEIGHT:635
    },
      
    BOX2D_SETTING:{
      PTM:40,
      DEBUG: true
    },
              
    PRELOAD_ASSETS : [
        {src: "image1.png", id: "grant",type:"spritesheet", width:20, height:20},
        {src: "character.png", id: "character",type:"spritesheet",
           width:32, 
           height:64,
           animations:{
            down:[0,5],
            up:[6,11],
            left:[12,17],
            right:[18,25]
           }
        },
        {src: "button_sprite_max.png", id: "buttondemo",type:"spritesheet", width:180, height:30},
        {src: "loading.jpg", id: "loading", type:"bitmap"}
    ]
    
  };
  return _settings;
}); 
