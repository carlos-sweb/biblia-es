define([
	'backbone',
	'text!views/header/viewMain.html',
	'librosModel'
	],function(Backbone,viewHeader,librosModel){
	var vContent = Backbone.View.extend({
			el:"#content",
			template:_.template(
				`<%_.each(content,function(_c,_i){ %>
					<%if(_i ==1){%><div class="divider"><div/><%}%>
					<div class='row center-xs animated fadeIn'>
						<div class="col-xs-11  start-xs" >
							<strong><%=_i%></strong>
							<p ><%=_c%></p>	
						</div>
					</div>
					<%if(_.keys(content).length != _i){%><div class="divider"><div/><%}%>	
				<%})%>`),
			preLoadTemplate:_.template(`<div class="loading loading-lg"></div>`),
			templateCapitulos:_.template(`
					<%for(var i=1;i<=max_cap;i++){%>
						<option value="<%=i%>" <%if(parseInt(i) == parseInt(capitulo)){%> selected <%}%> value='<%=i%>' ><%=i%></option>
					<%}%>`),
			templateHeader:_.template(viewHeader),
			initialize:function(options){

				const opt = _.pick(options,["libro","capitulo","max_cap"]);
			 	_.extend(this,opt)
				this.$el.find("#content-body").html(this.preLoadTemplate());
				this.listenTo(this.model, "change", this.render);
				this.model.run(this.libro);


			},
			changeCapitulo:function(capitulo){
				this.capitulo = capitulo;

				this.$el.find("#content-body").html(this.preLoadTemplate());
				this.render();
				//alert("render change capitulo");
			},
			render:function(){
				
				_.delay(()=>{

				this.$el.find("#content-header").html(this.templateHeader({libros:librosModel.get("libros")}));
				this.$el.find("#content-body").html( this.template({content:this.model.get(this.capitulo)}) );
				this.$el.parent().parent().find("#capitulos").html(this.templateCapitulos({max_cap:this.max_cap,capitulo:this.capitulo}))
				this.$el.parent().parent().find("#capitulos").removeAttr("disabled");
					
				},500);	
			}
		});

	return vContent;

});