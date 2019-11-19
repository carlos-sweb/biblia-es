require.config({	
  baseUrl:"",
  paths:{	
    text:"node_modules/requirejs-text/text",
    json:"node_modules/requirejs-plugins/src/json",
    voca:"node_modules/voca/index",
    mithril:"node_modules/mithril/render",
    init:"js/init"	
  }
});
require(["init","mithril"],
function(init,mithril){	

m.render(init.e_libros,m_libros)

})