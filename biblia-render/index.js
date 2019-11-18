const _         = require("underscore");
const v         = require("voca");
const path      = require('path');
const fs        = require('fs');
const  beautify = require('json-beautify');

const folder = 'origen';
//joining path of directory 
const directoryPath = path.join(__dirname, folder);
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
		fs.readFile( path.join(__dirname, folder+'/'+file), 'utf8', function(err, contents) {

				let _json_biblia = {};

				let lines = v.split(contents,"\n");
				let pattern = /\([0-9]{0,}, ([0-0]){0,}, [""]\)$/;
				
				_.each(lines,(l)=>{

						const regex = /^\([0-9]{1,}, ([0-9]{1,}), ([0-9]{1,}), [\']{1}([\D]{0,})[\']{1}[)]{1}[\,]{0,1}$/gm;
						const str = l;
						let m;

						while ((m = regex.exec(str)) !== null) {
							// This is necessary to avoid infinite loops with zero-width matches
							if (m.index === regex.lastIndex) {
								regex.lastIndex++;
							}

							let capitulo = parseInt(m[1]);
							let versiculo = parseInt(m[2]);
							let text = m[3];

							if( !_.has(_json_biblia,capitulo) ){
								_json_biblia[capitulo] = {};
								_json_biblia[capitulo][versiculo] = text
							}else{
								_json_biblia[capitulo][versiculo] = text
							};

							
						}

				});


				//console.log(beautify(_json_biblia,null,1,1));

				fs.writeFile('json/'+v.replace(v.replace(file,".txt",""),"_","")+'.json',
				beautify(_json_biblia,null,1,1), function (err) {
				if (err) throw err;
				console.log("Los libros fueron descargados");
				});


					
		});
    });
});