define([
"text!views/settings.html",
"backbone"],
function(template,Backbone){
	  var settings = Backbone.View.extend({
	  	  el:'#content',
	  	  template:_.template(template),
	  	  
	  	  initialize:function(){
	  	  	   this.render()
	  	  },
	  	  
	  	  render:function(){
	  	  	   this.$el.html(this.template())
	  	  }
	  	  
	  });
	  
	  return settings;
});