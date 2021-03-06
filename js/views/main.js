define([
"backbone",
"text!views/viewmain.html",
"mdcdrawer","mdclist","mdctopappbar"
],function(
Backbone,
viewMain,
mdcdrawer,mdclist,mdctopappbar){

	/** @constant
		@type {object}
		@default
	*/
	const events = {
		"change #libros"  : "changeLibro",
		"change #capitulos":"changeCapitulo",
		"click .mdc-top-app-bar__navigation-icon":"changeDrawer",
		"click .mdc-list-item":"changeDrawer"
	};

	const View = {
			/**@var
			@type {String}  element html
			*/
			el:"#main",
			template:_.template(viewMain),
			events:events, 
			initialize: function(){

				this.drawer = null;
				
				this.libro = "genesis";
				//this.listenTo(this.model, "change", this.render);
				this.render();

			},
			changeLibro:function(event){  				
					this.libro =  _.clone(event.currentTarget.value); 
					Backbone.history.navigate("#/biblia/"+this.libro+"/1",{trigger:true});
			},
			changeCapitulo:function(event){
					const capitulo = event.target.value;
					Backbone.history.navigate("#/biblia/"+this.libro+"/"+capitulo,{trigger:true});
			},
			changeDrawer:function(){
				if(!_.isNull(this.drawer)){
					this.drawer.open = !this.drawer.open;
				};
			},
			render: function() {

				 this.$el.html(this.template(this.model.attributes));

				 if( this.$el.find(".mdc-drawer")[0] ){ 
					 	this.drawer = mdcdrawer.MDCDrawer.attachTo(this.$el.find(".mdc-drawer")[0]);
				 };	 		
			},
			selectedMenu:function(){
			  	const fra = Backbone.history.getFragment();
				 this.$el.find("#drawer .mdc-list .mdc-list-item").each(function(){
				 	   if( ("#/"+fra) == $(this).attr("href") ){
				 	   	 $(this).addClass("mdc-list-item--activated")
				 	   };	 	   
				 });
			  
				
				
				
			}
		};
		var Main = Backbone.View.extend(View);
		return Main;
});