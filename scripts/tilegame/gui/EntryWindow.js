define([
    'lib/easel',
    'class/gui/JsonWindow',
    'class/service/ResourceService',
    'tilegame/common/gui',
    "tilegame/service/GameStateService"
    ], function(createjs,JsonWindow,ResourceService,GUI,GameStateService) {
  
    if (typeof createjs === 'undefined' ) {
        createjs = window.createjs;
    }
       
    function EntryWindow() {
      this.JsonWindow_constructor();
    }
    
    var p = createjs.extend(EntryWindow, JsonWindow);

    p.initalize = function() {
      this.initalizeWithJson(GUI.ENTRY_WINDOW);  
      
      var btn  = this.getChildByName("close");
      btn.on("click",function(e){
          alert("close got hit");
      });
      
      var btn2  = this.getChildByName("next");
      btn2.on("click",function(e){
          GameStateService.getInstance().stateMachine..ChangeState("DemoGameState");
      });
      
    } ;

    createjs.EntryWindow = createjs.promote(EntryWindow, "JsonWindow");
    return createjs.EntryWindow;
}); 