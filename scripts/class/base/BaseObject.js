define( function() {
  function BaseObject() {
    this._type="BaseObject";
    this.isType = function(type){
        return(type == this._type);
    } ;
  }
  return BaseObject;
}); 