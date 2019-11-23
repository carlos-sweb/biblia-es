require.config({	
  baseUrl:"",
  paths:{	
    underscore:"node_modules/underscore/underscore-min",
    
    text:"node_modules/requirejs-text/text",
    json:"node_modules/requirejs-plugins/src/json",

    voca:"node_modules/voca/index",
    jquery:"node_modules/jquery/dist/jquery.min",
    init:"js/init",
    router:"js/router",
    viewMain:"js/views/main",
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
  	   },
       init:{
         deps:['backbone','router']
       },
       viewMain:{
        deps:['backbone']
       }
  }
});


require(["jquery","backbone","underscore","init"],
function($,Backbone,_,init){

    new init.AppRouter();
    Backbone.history.start()
 
});
