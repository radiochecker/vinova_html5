define([
    'lib/easel',
    'class/gui/JsonWindow',
    'class/service/ResourceService',
    'race/common/gui'
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
      
     /* var btn  = this.getChildByName("close");
      btn.on("click",function(e){
          alert("close got hit");
      });
      
      var btn2  = this.getChildByName("next");
      btn2.on("click",function(e){
          createjs.GameStateService.getInstance().stateMachine.ChangeState("DemoGameState");
      });*/
      
    } ;

    createjs.EntryWindow = createjs.promote(EntryWindow, "JsonWindow");
    return createjs.EntryWindow;
}); 