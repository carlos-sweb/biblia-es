define(["backbone","text!views/viewmain.html"],function(Backbone,viewMain){
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
			}
		});

	return Main;
});