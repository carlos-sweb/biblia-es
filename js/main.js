require.config({	
  baseUrl:"",
  paths:{	
    underscore:"node_modules/underscore/underscore-min",
    
    text:"node_modules/requirejs-text/text",
    json:"node_modules/requirejs-plugins/src/json",

    voca:"node_modules/voca/index",
    jquery:"node_modules/jquery/dist/jquery.min",
    init:"js/init",
    backbone:"node_modules/backbone/backbone-min"
  },
  shim:{
  		 jquery:{
  				  	exports:'$'
  		 },
  	   underscore: { 
  	     exports: '_'
  	   },
  	   backbone:{
  	   	  exports: 'Backbone' ,
          deps:["jquery","underscore"]
  	   }
  }
});


require(["jquery","backbone","underscore","init"],function($,Backbone,_,init){


    var AppRouter = Backbone.Router.extend({
        routes: {
            ':libro/:capitulo': 'index',
            '*noFound':'noFound'
        },
        index:function(libro,capitulo){
          
          console.log()
          
        },
        noFound:function(){
             this.navigate("#/genesis/1",{trigger:true})
        }
    });

    new AppRouter();

    Backbone.history.start()
 
});
