require.config({	
  urlArgs:"bust=" + (new Date()).getTime(),
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
    viewContent:"js/views/content",
    viewSettings:"js/views/settings",
    viewMaps:"js/views/maps",
    viewFavorite:"js/views/favorite",
    
    librosModel:"js/models/libros",
    mContent:"js/models/content",
    backbone:"node_modules/backbone/backbone-min",
    mdcdrawer:"node_modules/@material/drawer/dist/mdc.drawer.min",
    mdclist:"node_modules/@material/list/dist/mdc.list.min",
    mdctopappbar:"node_modules/@material/top-app-bar/dist/mdc.topAppBar.min"
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
         deps:[
         	'backbone',
         	'router',
         	'viewMain',
          'viewContent',
         	'librosModel',
         	'mContent'
        	 ]
       },
       viewMain:{
        deps:[
          'backbone',
          'mdcdrawer',
          'mdclist',
          'mdctopappbar']
       },
       viewContent:{
        deps:['backbone']
       },
       librosModel:{
       	 deps:['backbone']
       },
       mContent:{
       	deps:['backbone']
       }
  }
});


require(["jquery","backbone","underscore","init"],
function($,Backbone,_,init){

    new init.AppRouter();
    Backbone.history.start()
 
});