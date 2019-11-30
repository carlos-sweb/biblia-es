define([
"backbone",
"json!libros2.0.json"
],
function(
Backbone,
libros){
	
	var Model = Backbone.Model.extend({
			 defaults:{libros:libros},
			 getUrlList:function(){
			 	  return _.map(this.get("libros"),(l)=>{
			 	  	  return l.val;
			 	  })
			 },
			 max_cap:function(libro){
			 	return  _.first(_.filter(this.get('libros'),(l)=>{
				 				return l.val == libro;	
				 	}))["cap"] 
			 }
		});
	
	return new Model();
	
});