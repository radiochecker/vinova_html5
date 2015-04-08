define(
  ['lib/easel',
   'class/base/GameLog'],
  function(createjs,Log) {
	
  if (typeof createjs === 'undefined' ) {
      createjs = window.createjs;
  }
  
	function StateMachine() {
		this.m_stateStack = [];
		this.m_statedictionary = {};
	}
	
	var p = StateMachine.prototype;

	p.initalize = function(statelist) {
		for(var index = 0; index < statelist.length; index++){
			var state = new statelist[index](this);
      if(this.m_statedictionary.hasOwnProperty(state.m_name)){
        Log.LogError("duplicate entry in state name" + state.m_name);
      }else{
        this.m_statedictionary[state.m_name] = state;
      }
 		}
		Log.LogInfo("duplicate entry in state name" + state.m_name);
	} ;

	p.ChangeState = function (statename) {
		if(this.GetActiveState(statename) != null)
			return;
    Log.LogInfo("change to state "+ statename);
		this.PopState();
		this.PushState(statename);
	} ;
	
	p.PopState = function () {
		var laststate = this.m_stateStack.pop();
		if(laststate != null)
			laststate.Exit();
    Log.LogInfo("pop state "+ laststate.m_name);
		return true;
	} ;
	
	p.PushState = function (statename) {
		
		if(this.GetActiveState(statename) != null)
			return;
		
		var state = this.GetState(statename);
		if(state != null){
      Log.LogInfo("push state "+ state.m_name);
			state.Enter();
			this.m_stateStack.push(state);
			return true;
		}
		return false;
	} ;
	
	p.GetState = function(statename) {
		if(this.m_statedictionary.hasOwnProperty(statename)){
			return this.m_statedictionary[statename];
		}
		return null;
	} ;
	
	p.GetActiveState = function(statename){
		for(var index = 0; index < this.m_stateStack.length; index++){
			if(this.m_stateStack[index].name == statename)
				return this.m_stateStack[index];
		}
		return null;
	} ;
	
	p.GetCurrentState = function(){
		if(this.m_stateStack.length > 0)
			return this.m_stateStack[this.m_stateStack.length - 1];
		else	
			return null;
	} ;
	
	p.Update = function(time_elapsed) {
		var state = this.GetCurrentState();
		if(state)
			state.Update(time_elapsed);
	} ;

	createjs.StateMachine = StateMachine;
	return StateMachine;
}); 