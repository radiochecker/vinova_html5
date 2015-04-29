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
           width:20, 
           height:20,
           animations:{
            idle:0,
            run:[1,5],
            jump:[6,8,'run']
           }
        },
        {src: "button_sprite_max.png", id: "buttondemo",type:"spritesheet", width:180, height:30},
        {src: "loading.jpg", id: "loading", type:"bitmap"}
    ]
    
  };
  return _settings;
}); 
