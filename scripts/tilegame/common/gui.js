define([
    'tilegame/common/GameSettings'
    ],function(_settings) {
  var _guis = {
    LOADING_WINDOW : {
      children:[
        {
          type: "plainbutton",
          property:{
            x:0,
            xalign:"center",
            yalign:"center",
            y:0,
            name: "loading",
            label:"loading game ...",
            color:_settings.SCENE_SETTING.BKCOLOR,
            textcolor:"#ffffff",
            width:180,
            height:30
          }
        }
      ],
      property:{
        x:0,
        y:0,
        name: "loadingwindow",
        width:_settings.SCENE_SETTING.WIDTH, //fullscreen width
        height:_settings.SCENE_SETTING.HEIGHT,//fullscreen height
        color:_settings.SCENE_SETTING.BKCOLOR,
      }
    },
    ENTRY_WINDOW : {
      children:[
        {
          type: "plainbutton",
          property:{
            x:20,
            y:0,
            yalign:"top",
            name: "close",
            label:"close",
            color:_settings.SCENE_SETTING.BKCOLOR,
            textcolor:"#ffffff",
            width:280,
            height:80
          }
        },
        {
          type: "imagebutton",
          property:{
            x:0,
            y:0,
            xalign:"center",
            yalign:"center",
            image:"buttondemo",
            name: "next",
            label:"close",
            color:_settings.SCENE_SETTING.BKCOLOR,
            textcolor:"#ffffff",
            width:180,
            height:30
          }
        },
        {
          type: "imagebutton",
          property:{
            x:0,
            y:0,
            xalign:"right",
            yalign:"bottom",
            image:"buttondemo",
            name: "boxgame",
            label:"boxgame",
            color:_settings.SCENE_SETTING.BKCOLOR,
            textcolor:"#ffffff",
            width:180,
            height:30
          }
        }
        
      ],
      property:{
        x:0,
        y:0,
        name: "entrywindow",
        width:_settings.SCENE_SETTING.WIDTH, //fullscreen width
        height:_settings.SCENE_SETTING.HEIGHT,//fullscreen height
        image:"loading"
      }
    }
  };
  return _guis;
}); 