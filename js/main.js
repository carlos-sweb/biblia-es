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
  					"underscore"
            ]
  				},
  				zepto:{
  				  	exports:'$'
  				},
  	   underscore: { 
  	     exports: '_'
  	   },
  }
});


require(["init","zepto"],
function(init,$){


  var Data = {
      content:[],
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
                      console.log("no render");
                      Data.fetch(vnode.attrs.libro).then((result)=>{
                        this._content = result;
                        this.libro = libro;
                      });
              }else{
                    console.log("render");
                    return _.map(this._content[capitulo],function(cap,iterator){      
                          return [m("div",{class:"col-xs-10 col-xs-offset-1"},[m("strong",iterator),m("p",cap)]),m("div",{class:"divider"})]
                    });
              };
              
            }else{
                return m("div",{class:"loading loading-lg"},""); 
            };

              
            /*if(_.isNull(this._content)){
               
            }else{
               
            };*/
           
           

        }
    }

    
   $(init.e_libros).on("change",function(){
      m.route.set( "/:libro/:capitulos" , { capitulos: 1, libro: $(this).val() } )
   }); 
   
  /*renderizando*/
  m.render(
   init.e_libros,
   _.map(init.libros,(l)=>{   
      return m("option",
      { value:l.val },l.text);
   }))
  /*renderizando*/
  /*Router para la biblia*/
  m.route(document.querySelector("#content"),
      "/genesis/1",{
      "/:libro/:capitulo": Biblia
  })
  /*Router para la biblia*/
  


  })