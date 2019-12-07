define([
"text!views/favorite.html",
"backbone"],
function(template,Backbone){
	  var settings = Backbone.View.extend({
	  	  el:'#content',
	  	  template:_.template(template),
	  	  initialize:function(){
	  	  	   this.render();
	  	  },  	  
	  	  render:function(){
	  	  	
	  	  	this.$el.find("#content-header").html("");
	  	  	this.$el.find("#content-body").html(this.template());
	  	  	this.$el.find("#content-footer").html("");
	  	  	//this.$el.html()

	  	  }
	  	  
	  });
	  
	  return settings;
});