define(function(){
	
	return {
		routes: {
			':libro/:capitulo': 'index',
			'*noFound':'noFound'
		},
		noFound:function(){
				this.navigate("#/genesis/1",{trigger:true});
		}
	};

});