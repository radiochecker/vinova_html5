var _gasrc = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga';
 
require.config({
  shim: {
    easel: {
      exports: 'createjs'
    },
    tween: {
      deps: ['easel'],
      exports: 'Tween'
    }
  },
  paths: {
    easel: '//code.createjs.com/easeljs-0.8.0.min',
    tween: '//code.createjs.com/tweenjs-0.6.0.min',
    preload: '//code.createjs.com/preloadjs-0.6.0.min',
    facebook: '//connect.facebook.net/en_US/sdk',
    //jquery: '//code.jquery.com/jquery-1.11.2.min',
    jquery: 'lib/jquery-1.11.2.min',
    googleanalytics: _gasrc
    //box2d: 'lib/box2d_v.2.3.1_min'
    //box2d: '//raw.githubusercontent.com/kripken/box2d.js/master/build/Box2D_v2.3.1_min'
  }   
});

require(["lib/easel",
         "tilegame/service/GameStateService",
         "tilegame/common/GameSettings",
         "class/service/ResourceService",
         "class/tracking/TrackingManager", 
         "class/gui/GuiService",
         "class/service/SceneService",
         "jquery"], function(createjs,GameStateService,GameSetting,ResourceService,TrackingManager,GuiService,SceneService,jquery) {

  if (typeof createjs === 'undefined' ) {
    createjs = window.createjs;
  }
  
  jquery("document").ready(function() {
    TrackingManager.getInstance().initalize(GameSetting.TRACKING_SETTING);       
    SceneService.getInstance().initalize(GameSetting.SCENE_SETTING);
    GuiService.getInstance().initalize();
    ResourceService.getInstance().initalize({});
    GameStateService.getInstance().initalize({startstate:'DemoLoadingState'});
    TrackingManager.getInstance().AddEvent("gamestart",""); 
  });
  
});
