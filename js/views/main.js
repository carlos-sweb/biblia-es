define([
"backbone",
"text!views/viewmain.html",
"mdcdrawer","mdclist"
],function(
Backbone,
viewMain,
mdcdrawer,mdclist){
	
	var Main = Backbone.View.extend({
			el:"#main",
			template:_.template(viewMain),
			events: {
			"change #libros": "changeLibro",
			"change #capitulos":"changeCapitulo"
			},
			initialize: function() {
				
				this.libro = "genesis";
				//this.listenTo(this.model, "change", this.render);
				this.render();
			},
			changeLibro:function(event){  				
					this.libro =  _.clone(event.currentTarget.value); 
					Backbone.history.navigate("#/"+this.libro+"/1",{trigger:true});
			},
			changeCapitulo:function(event){
					const capitulo = event.target.value;
					Backbone.history.navigate("#/"+this.libro+"/"+capitulo,{trigger:true});
			},
			render: function() {	
				 this.$el.html(this.template(this.model.attributes));
				 const drawer = mdcdrawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
			  setTimeout(()=>{
			  	drawer.open =true;
			  },3000);
			  const list = mdclist.MDCList.attachTo(document.querySelector('.mdc-list'));
     list.wrapFocus = true;
			  
			  
			
			}
		});

	return Main;
});