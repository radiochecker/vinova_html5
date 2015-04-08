define([
    'lib/easel',
    'class/gui/JsonWindow',
    'class/service/ResourceService',
    'tilegame/common/gui'
    ], function(createjs,JsonWindow,ResourceService,GUI) {
  
    if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
    }
       
    function EntryWindow() {
      this.JsonWindow_constructor();
    }
    
    var p = createjs.extend(EntryWindow, JsonWindow);

    p.initalize = function() {
       

       this.initalizeWithJson(GUI.ENTRY_WINDOW);   
    } ;

    createjs.EntryWindow = createjs.promote(EntryWindow, "JsonWindow");
    return createjs.EntryWindow;
}); 