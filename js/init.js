define(
['json!libros2.0.json','backbone','underscore','jquery','router','viewMain'],
function(libros,Backbone,_,$,router,viewMain){

		var Book = Backbone.Model.extend({
			 defaults:{
			 	libros:libros
			 }
		});

		var nBook = new Book();

		var mContent = Backbone.Model.extend({
			run:function(libro){
				this.url = "json/"+libro+".json";
				this.fetch();	
			}
		});

		var vContent = Backbone.View.extend({
			el:"#content",
			template:_.template(
				`<%_.each(content,function(_c,_i){ %>
					<div class='row center-xs animated fadeIn'>
						<div class="col-xs-11  start-xs" >
							<strong><%=_i%></strong>
							<p ><%=_c%></p>	
						</div>
					</div>
					<div class="divider"><div/>	
				<%})%>`),
			preLoadTemplate:_.template(`<div class="loading loading-lg"></div>`),
			templateCapitulos:_.template(`
					<%for(var i=1;i<=max_cap;i++){%>
						<option value="<%=i%>" <%if(parseInt(i) == parseInt(capitulo)){%> selected <%}%> value='<%=i%>' ><%=i%></option>
					<%}%>`),
			initialize:function(options){
				
				this.libro = options.libro;
				this.max_cap = options.max_cap;
				this.capitulo = options.capitulo;
				this.$el.html(this.preLoadTemplate());
				this.listenTo(this.model, "change", this.render);
				this.model.run(this.libro);

			},
			changeCapitulo:function(capitulo){
				this.capitulo = capitulo;
				this.$el.html(this.preLoadTemplate());
				this.render();
				//alert("render change capitulo");
			},
			render:function(){
				console.log();
				_.delay(()=>{
					this.$el.html( this.template({content:this.model.get(this.capitulo)}) );
					this.$el.parent().parent().find("#capitulos").html(this.templateCapitulos({max_cap:this.max_cap,capitulo:this.capitulo}))
					this.$el.parent().parent().find("#capitulos").removeAttr("disabled");
				},500);
				
			}
		});


		

		var AppRouter = Backbone.Router.extend(_.extend(router,{
			initialize:function(){

				this.vContent = null;
				this.init_check = false;
				
				/* se establece libros_url para verificación del 
				listado de urls*/
				this.libros_url = _.map(nBook.get("libros"),(l)=>{
					return l.val;
				});
				// Se inicia la vista main 
				// es independiente del estado de la url
				this.vMain = new viewMain({model:nBook});
			},
			routes: {
			':libro/:capitulo': 'index',
			'*noFound':'noFound'
			},
			index:function(libro,capitulo){
						

				 if(  _.indexOf(this.libros_url,libro ) == -1 ){
				 		this.vMain.libro = "genesis";
				 		if(_.isNull(this.vMain.libro)){this.vMain.libro="genesis"};
				 		// O ver la forma de back url
				 		this.navigate("#/genesis/1",{trigger:true});
				 		$("#libros option[value=genesis]").attr("selected",true);
				 }else{
				 	
				 	this.vMain.libro = libro;

				 	if( !this.init_check ){ 
					 	$("#libros option").each(function(){
					 		if($(this).val() == libro){ 
					 			$(this).attr("selected",true)
					 		};
					 	});
					 	this.init_check = true;
					 
				 	};

			 		const max_cap = 
				 			_.first(_.filter(nBook.get('libros'),(l)=>{
				 				return l.val == libro;	
				 	}))["cap"] 
				 	
				
				    if(_.isNull(this.vContent)){			
			 			this.vContent = new vContent({libro:libro,capitulo:capitulo,max_cap:max_cap,model:new mContent()});
				 	}else{
				 		if( libro != this.vContent.libro  ){
				 			this.vContent = new vContent({libro:libro,capitulo:capitulo,max_cap:max_cap,model:new mContent()});
				 		}else{
				 			this.vContent.changeCapitulo(capitulo);
				 		};
				 		
				 	};

				 };
			}
		}));

	
	return {
		AppRouter:AppRouter
	};
	
});