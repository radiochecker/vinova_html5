this.createjs = this.createjs||{};
define( function() {
    
  function AssetLoadRequest(type,dataset,callback,caller) {
    this._callback = callback;
    this._caller = caller;
    this._dataset = dataset;
    this._type = type;
  }
  
  var p = AssetLoadRequest.prototype;

  p.FireCallback = function(result,data){
    if(this._callback != null){
      this._callback(result,data,this._caller);
    }
  };
  
  createjs.AssetLoadRequest = AssetLoadRequest;
  return AssetLoadRequest;
}); 