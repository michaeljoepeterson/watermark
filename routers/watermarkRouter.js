const express = require("express");
const router = express.Router();
const Jimp = require("jimp");
const {imageDir,compositeDir} = require("../config")
const {Reader} = require("../reader/readFiles");

router.get("/",(req,res) => {
	let srcImg;
	let compositeImg;
	return Jimp.read("./data/Band poster 1.jpg")

	.then(image => {
		srcImg = image;
		return Jimp.read("./data/test.png")
		
	})

	.then(image => {
		compositeImg = image;
		console.log(compositeImg.bitmap.width,compositeImg.bitmap.height);
		return srcImg.composite(compositeImg,0,0).writeAsync("./data/testimage.png")
	})

	.then(data => {
		res.json({
			res:200,
			message:"All done"
		})
	})

	.catch(err => {
		console.log("Error in router: ",err);
		res.json({
			res:500,
			message:"An error occured"
		})
	})
});

router.get("/start",(req,res) => {
	const reader = new Reader(imageDir,compositeDir);
	const dirFileNames = {
		imageNames:[],
		compositeNames:[]
	}
	return reader.readDir(imageDir)

	.then(fileNames => {
		dirFileNames.imageNames = fileNames;

		return reader.readDir(compositeDir)
	})

	.then(fileNames => {
		dirFileNames.compositeNames = fileNames;
		res.json({
			res:200,
			message:"All done",
			data:dirFileNames
		})
	})

});

module.exports = {router};