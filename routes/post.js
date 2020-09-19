const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, User } = require("../models");

const router = express.Router();

fs.readdir("uploads", (error) => {
	if (error) {
		console.error("upload폴더가 없어 upload폴더를 생성합니다.");
		fs.mkdirSync("uploads");
	}
});

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, "uploads/");
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

// router.post("/img", upload.single("img"), (req, res, next) => {
// 	console.log(req.file);
// 	res.json({ url: `/uploads/${req.file.filename}` });
// });

const upload2 = multer();
router.post("/", upload.single("url"), async (req, res, next) => {
	console.log(req.file, req.body);
	let url = ``;
	if (req.file) {
		url = `/uploads/${req.file.filename}`;
	}
	// const url = `/uploads/${req.file.filename}`;

	try {
		await Post.create({
			category: 1,
			title: req.body.title,
			description: req.body.description,
			img: url,
			authorId: "hsyeon4001",
		});
		console.log("here");

		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
