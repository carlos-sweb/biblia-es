define(function(){
	
	return {
		routes: {
			'biblia/:libro/:capitulo': 'index',
			'settings':'settings',
			'*noFound':'noFound'
		},
		noFound:function(){
				this.navigate("#/biblia/genesis/1",{trigger:true});
		}
	};

});