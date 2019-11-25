define(['backbone'],function(Backbone){

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
				const opt = _.pick(options,["libro","capitulo","max_cap"]);
			 	_.extend(this,opt)
				
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
				_.delay(()=>{
					this.$el.html( this.template({content:this.model.get(this.capitulo)}) );
					this.$el.parent().parent().find("#capitulos").html(this.templateCapitulos({max_cap:this.max_cap,capitulo:this.capitulo}))
					this.$el.parent().parent().find("#capitulos").removeAttr("disabled");
				},500);
				
			}
		});

	return vContent;

});