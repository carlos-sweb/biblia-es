define(
['json!libros.json','mithril'],
function(libros,mithril){
	
	console.log(m)
	
	return {
		 libros:libros, e_libros:document.getElementById("libros"),
		 m_libros:libros.map((l)=>{
		 	 return mithril("option",{
		 	 	value:l.val
		 	 },l.text);
		 })
	};
	
});