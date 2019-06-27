const fs = require('fs');

function Reader(imageDir,compositeDir){
	this.imageDir = imageDir;
	this.compositeDir = compositeDir;
}

Reader.prototype.readDir = function(dirname) {
	let promise = new Promise((resolve,reject) => {
		let fileNames = [];
		let adjustedDir = "./" + dirname;
		console.log(adjustedDir);
		fs.readdir(dirname,function(err,files){
			if(err){
				reject(err);
			}
			files.forEach(function(fileName){
				fileNames.push(fileName);
			})
			resolve(fileNames);
		})

	});

	return promise
};

module.exports = {Reader};