define(
['json!libros2.0.json',
 'backbone',
 'underscore',
 'jquery',
 'router',
 'viewMain',
 'viewContent',
 'viewSettings',
 'viewMaps',
 'viewFavorite',
 'librosModel',
 'mContent'],
function(
libros,
Backbone,
_,
$,
router,
viewMain,
viewContent,
viewSettings,
viewMaps,
viewFavorite,
librosModel,
mContent){	

		var AppRouter = Backbone.Router.extend(_.extend(router,{
			initialize:function(){

				this.viewContent = null;
				
				this.init_check = false;
				/* se establece libros_url para verificación del 
				listado de urls*/
				this.libros_url = librosModel.getUrlList()
				// Se inicia la vista main 
				// es independiente del estado de la url
				this.vMain = new viewMain({model:librosModel});

				Backbone.history.start();

				this.vMain.selectedMenu();
				
			},
			checkUrlLibro:function(libro,capitulo,done,reject){
				 if( _.indexOf(this.libros_url,libro) == -1 ){
				 	reject(libro,capitulo).bind(this);
				 }else{
				 	done(libro,capitulo)
				 };
			},
			urlError:function(libro,capitulo){
				this.vMain.libro = "genesis";
				if(_.isNull(this.vMain.libro)){this.vMain.libro="genesis"};
				// O ver la forma de back url
				this.navigate("#/biblia/genesis/1",{trigger:true});
				$("#libros option[value=genesis]").attr("selected",true);
			},
			urlSuccess:function(libro,capitulo){
				// No se para que sirve ??
				this.vMain.libro = libro;
		 		const max_cap = librosModel.max_cap(libro); 		 	
			
			    if(_.isNull(this.viewContent)){			
		 			this.viewContent = new viewContent({libro:libro,capitulo:capitulo,max_cap:max_cap,model:new mContent()});
			 	}else{
			 		if( libro != this.viewContent.libro  ){
			 			this.viewContent = new viewContent({libro:libro,capitulo:capitulo,max_cap:max_cap,model:new mContent()});
			 		}else{
			 			this.viewContent.changeCapitulo(capitulo);
			 		};
			 		
			 	};
			},
			index:function(libro,capitulo){
				// call checkUrlLibro
				this.checkUrlLibro(
					libro,
					capitulo,
					this.urlSuccess.bind(this),
					this.urlError.bind(this));
			 },
			 favorite:function(){	
			 	  new viewFavorite();
			 },
			 maps:function(){
			 	  new viewMaps();
			 },
			 settings:function(){
			 	  new viewSettings()
			 }
				//--
			}
		)//_.extend
		);

	// retorn el AppRouter
	return {AppRouter:AppRouter};
});