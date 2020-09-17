const express = require("express");
const { Post, User } = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("main");
});

router.get("/gallery/:page", async (req, res) => {
	let page = req.params.page;
	let offset = 0;
	console.log(page);
	try {
		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const posts = await Post.findAll({
			attributes: ["img", "title", "createdAt"],
			offset: offset,
			limit: 6,
		});
		console.log(posts[0].title, posts[0].img, posts[0].createdAt);
		res.render("gallery", {
			title: posts[0].title,
			thumb: posts[0].img,
			date: posts[0].createdAt,
		});
	} catch {
		console.error(error);
		next(error);
	}
});

router.get("/post", (req, res) => {
	res.render("post");
});

module.exports = router;
