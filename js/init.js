define(
['json!libros.json'],
function(libros){
	
	return {
		 libros:libros, e_libros:document.getElementById("libros")
	};
	
});