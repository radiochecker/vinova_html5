define(
function() {
  var _settings = {
    ASSET_TYPE:{
      BITMAP: "bitmap",
      SPRITESHEET: "spritesheet",
      JSON:"json",
      UNKNOWN:"unknown"
    },
    SOCIAL_TYPE:{
      FACEBOOK: "facebook",
      WEIBO: "weibo",
      WEIXIN:"weixin",
      UNKNOWN:"unknown"
    },
    OPERATION_RESULT:{
      UNKNOWN:-1,
      SUCCESS:0,
      PENDING:1,
      FAILED:2,
      TIMEOUT:4
    }
  };
  return _settings;
}); 