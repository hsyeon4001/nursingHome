const express = require("express");
const multer = require("multer");
const path = require("path");

const { Post, User } = require("../models");

const router = express.Router();

router.post("/join", async (req, res, next) => {
	console.log("here");
	try {
		await User.create({
			id: req.body.id,
			password: req.body.password,
			name: req.body.name,
			job: req.body.job,
		});

		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
