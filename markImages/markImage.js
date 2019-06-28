const Jimp = require("jimp");

function MarkImage(imageNames,compositeImage,imageDir,compositeDir){
	this.imageNames = imageNames;
	this.compositeImage = compositeImage;
	this.imageDir = imageDir;
	this.compositeDir = compositeDir;
}

MarkImage.prototype.markImages = function(nameIndex) {
	let promise = new Promise((resolve,reject) => {
		
		if(nameIndex < this.imageNames.length){
			console.log("test :");
			let srcImg;
			let compositeImg;
			let imagePath = "./" + this.imageDir + "/" + this.imageNames[nameIndex];
			console.log("creating images :",imagePath);
			return Jimp.read(imagePath)

			.then(image => {
				srcImg = image;
				console.log("src image found :", nameIndex,this.imageNames[nameIndex]);
				let compositePath = "./" + this.compositeDir + "/" + this.compositeImage;
				return Jimp.read(compositePath)
			})

			.then(compImg => {
				compositeImg = compImg;
				let extensionRegex = /\.\w{3}/g;
				let cleanedName = this.imageNames[nameIndex].replace(extensionRegex,"");
				let newPath = "./newImages/" + cleanedName + "Marked.png";
				console.log("comp image found :", nameIndex,this.imageNames[nameIndex],newPath);
				return srcImg.composite(compositeImg,0,0).writeAsync(newPath)
			})

			.then(data => {
				console.log("image created :", nameIndex,this.imageNames[nameIndex]);
				resolve(this.markImages(nameIndex + 1));
			})
			.catch(err => {
				reject(err);
			})
		}
		else{
			console.log("end image marking :");
			resolve("complete");
		}

		console.log("end image marking test 2:");
	});

	return promise;
};

module.exports = {MarkImage};