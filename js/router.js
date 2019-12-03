define(function(){	
	return {
		routes: {
			'biblia/:libro/:capitulo': 'index',
			'settings':'settings',
			'maps':'maps',
			'favorite':'favorite',
			'*noFound':'noFound'
		},
		noFound:function(){
				this.navigate("#/biblia/genesis/1",{trigger:true});
		}
	};
});	