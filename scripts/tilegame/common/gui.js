define(
function() {
  var _guis = {
    LOADING_WINDOW : {
      children:[
        {
          type: "plainbutton",
          property:{
            x:100,y:50,
            name: "close",
            label:"close",
            color:"DeepSkyBlue",
            width:180,
            height:30
          }
        }
      ],
      property:{
        x:0,
        y:0,
        name: "loadingwindow",
        width:750,
        height:1035,
        color:"DeepSkyBlue",
      }
    },
    ENTRY_WINDOW : {
      children:[
        {
          type: "plainbutton",
          property:{
            x:100,
            y:50,
            name: "close",
            label:"close",
            color:"DeepSkyBlue",
            width:180,
            height:30
          }
        },
        {
          type: "imagebutton",
          property:{
            x:40,
            y:100,
            image:"buttondemo",
            name: "next"
          }
        }
      ],
      property:{
        x:0,
        y:0,
        name: "entrywindow",
        width:400,
        height:600,
  
        image:"loading"
      }
    }
  };
  return _guis;
}); 