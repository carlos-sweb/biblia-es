define(['backbone'],function(Backbone){
	var mContent = Backbone.Model.extend({
			run:function(libro){
				this.url = "json/"+libro+".json";
				this.fetch();	
			}
		});
		
		return mContent;
})