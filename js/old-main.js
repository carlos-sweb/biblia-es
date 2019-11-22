require.config({	
  baseUrl:"",
  paths:{	
    underscore:"node_modules/underscore/underscore-min",
    text:"node_modules/requirejs-text/text",
    json:"node_modules/requirejs-plugins/src/json",
    voca:"node_modules/voca/index",
    mithril:"node_modules/mithril/index",
    zepto:"node_modules/zepto/dist/zepto.min",
    init:"js/init",
    backbone:"node_modules/backbone/backbone-min.js"
  },
  shim:{
  				init:{
  					deps:[
  					"zepto",
  					"underscore"
            ]
  				},
  				zepto:{
  				  	exports:'$'
  				},
  	   underscore: { 
  	     exports: '_'
  	   },
  	   backbone:{
  	   	  exports: 'Backbone'
  	   }
  }
});


require(["init","zepto"],
function(init,$){
	
 
	 var HeaderBiblia = {
	 	  view:function(vnode){
	 	  	 let libro= vnode.attrs.libro;
	 	  	   return [
	 	  	  			 m("div.divider"),
	 	  	  			 m("div",{class:"row start-sm center-xs animated fadeIn"},[
	 	  	  			   m("div.col-xs-11",[
	 	  	  			   		m("div.form-group",[
	 	  	  			   			m("select.form-select",{
	 	  	  			   					id:"capitulo",
	 	  	  			   					onchange:function(event){
	 	  	  			   				    m.route.set("/:libro/1",{libro:event.target.value})
	 	  	  			   			  }},
	 	  	  			   			
	 	  	  			   			 _.map(init.libros,(l)=>{   
      return m("option",
         (libro == l.val ? { value:l.val,selected:true } : { value:l.val }),l.text);
      })
	 	  	  			   			
	 	  	  			   			)
	 	  	  			   		])
	 	  	  			   ])
	 	  	  			 ]),
	 	  	  		m("div.divider")
	 	  	   ];
	 	  }
	 }
	 
  var Data = {
      fetch:function(libro){
         return  m.request({
                  method: "GET",
                  url: "json/"+libro+".json"
            })   
      }
  }

  var Biblia = {
        oninit:function(vnode){
            this.libro = vnode.attrs.libro;
            this.capitulo = vnode.attrs.capitulo;
            
            this._content = null;
            Data.fetch(vnode.attrs.libro).then((result)=>{
                this._content = result;
            });
        },
        view: function(vnode){
            const libro = vnode.attrs.libro || "genesis" ;
            const capitulo = vnode.attrs.capitulo || "1" ;
            if( this._content != null ){
              if( this.libro != libro ){
                      //alert("no render");   
                      Data.fetch(vnode.attrs.libro).then((result)=>{
                        this._content = result;
                        this.libro = libro;
                      });
                      return m("div",{class:"loading loading-lg"})
              }else{
                    //alert("render");
                  /* const c = _.map(this._content[capitulo],function(cap,iterator){      
                        return [m("div",{class:"col-xs-10 col-xs-offset-1"},[m("strong",iterator),m("p",cap)]),m("div",{class:"divider"})]
                   });*/
                   
                   return [m(HeaderBiblia,{libro:libro}),_.map(this._content[capitulo],function(cap,iterator){      
                        return [m("div",{class:"col-xs-10 col-xs-offset-1"},[m("strong",iterator),m("p",cap)]),m("div",{class:"divider"})]
                   })]
              };
              
            }else{
                return m("div",{class:"loading loading-lg"},""); 
            };

           
           
           

        }
    }

    
  /*Router para la biblia*/
  m.route(document.body,
      "/genesis/1",{
      "/:libro/:capitulo": Biblia
  })
  /*Router para la biblia*/
  


  })