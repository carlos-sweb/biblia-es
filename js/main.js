require.config({	
  baseUrl:"",
  paths:{	
    underscore:"node_modules/underscore/underscore-min",
    text:"node_modules/requirejs-text/text",
    json:"node_modules/requirejs-plugins/src/json",
    voca:"node_modules/voca/index",
    mithril:"node_modules/mithril/index",
    zepto:"node_modules/zepto/dist/zepto.min",
    init:"js/init"	
  },
  shim:{
  				init:{
  					deps:[
  					"zepto",
  					"underscore"]
  				},
  				zepto:{
  				  	exports:'$'
  				},
  	   underscore: { 
  	     exports: '_'
  	   },
  }
});