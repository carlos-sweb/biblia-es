define(["backbone","json!libros2.0.json"],
function(Backbone,libros){
	var Model = Backbone.Model.extend({
			 defaults:{libros:libros},
			 getUrlList:function(){
			 	  return _.map(this.get("libros"),(l)=>{
			 	  	  return l.val;
			 	  })
			 }
		});
	
	return new Model();
	
});