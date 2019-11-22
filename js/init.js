define(
['json!libros.json','backbone','underscore','jquery'],
function(libros,Backbone,_,$){


		var Book = Backbone.Model.extend({
			 defaults:{
			 	libros:libros
			 }
		});

		var nBook = new Book();

		var mContent = Backbone.Model.extend({
			initialize:function(options){
				const libro = options.libro || "genesis";
				this.url = "json/"+libro+".json";
			},
			defaults:{
				content:null
			} 
		});


		var vContent = Backbone.View.extend({
			el:"#content",
			template:_.template(`<h1>Hola a todos</h1>`),
			initialize:function(){
				this.model.fetch().then((data)=>{
						console.log(data);
						this.render();
				});
				
			},
			render:function(){
				this.$el.html( this.template() );
			}
		});


		var Main = Backbone.View.extend({
			el:"#main",
			template:_.template(
			`<div class='col-xs-12 animated fadeIn' >
				<div class="divider" ></div>				
				<div class="row center-xs">
					<div class="col-xs-11" >
						<div class="form-group"  >
							<select id="libros" class="form-select" >
								<%_.each(libros,function(l){%>
									<option value="<%=l.val%>" ><%=l.text%></option>
								<%})%>
							</select>
						</div>
						<!--
						<div class="form-group"  >
							<select id="libros" class="form-select" >
								<%_.each(libros,function(l){%>
									<option value="<%=l.val%>" ><%=l.text%></option>
								<%})%>
							</select>
						</div>
						-->
					</div>
				</div>
				<div class="divider" ></div>
				<div class="row center-xs" >
					<div class="col-xs-11" id="content" ></div>
				</div>
			</div>`),
			events: {
			"change #libros": "changeLibro",
			},
			initialize: function() {
				//this.listenTo(this.model, "change", this.render);
				this.render();
			},
			changeLibro:function(event){
					const libro = event.target.value;
					Backbone.history.navigate("#/"+libro+"/1",{trigger:true});
			},
			render: function() {	
				 this.$el.html(this.template(this.model.attributes));
			}
		});
			

		var AppRouter = Backbone.Router.extend({
			initialize:function(){
				this.init_check = false;
				this.libros_url = _.map(nBook.get("libros"),(l)=>{
					return l.val;
				});
				new Main({model:nBook});
			},
			routes: {
			':libro/:capitulo': 'index',
			'*noFound':'noFound'
			},
			index:function(libro,capitulo){
				 if(  _.indexOf(this.libros_url,libro ) == -1 ){
				 		// O ver la forma de back url
				 		this.navigate("#/genesis/1",{trigger:true});
				 		$("#libros option[value=genesis]").attr("selected",true);
				 }else{
				 	if( !this.init_check ){ 
					 	$("#libros option").each(function(){
					 		$(this).val() == libro && ( $(this).attr("selected",true) ); 
					 		
					 	});
					 	this.init_check = true;
				 	};
				 	
			 		new vContent({model:new mContent({libro:libro})});
				 	
				 };
			},
			noFound:function(){
				this.navigate("#/genesis/1",{trigger:true});
			}
		});

		

	return {
		libros:libros,
		AppRouter:AppRouter
	};
	
});