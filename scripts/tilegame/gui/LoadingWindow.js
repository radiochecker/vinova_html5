define([
    'lib/easel',
    'class/gui/JsonWindow',
    'tilegame/common/gui'
    ], function(createjs,JsonWindow,GUI) {
  
    if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
    }
       
    function LoadingWindow() {
      this.JsonWindow_constructor();
    }
    
    var p = createjs.extend(LoadingWindow, JsonWindow);

    p.initalize = function() {
        this.initalizeWithJson(GUI.LOADING_WINDOW);   
    } ;

    createjs.LoadingWindow = createjs.promote(LoadingWindow, "JsonWindow");
    return createjs.LoadingWindow;
}); 