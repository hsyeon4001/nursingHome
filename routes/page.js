const express = require("express");
const passport = require("passport");
const { Post, User } = require("../models");
const authTokenController = require("./authTokenController.js");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("main");
});

router.get("/gallery", async (req, res) => {
	let page = req.query.page;
	let offset = 0;

	try {
		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const posts = await Post.findAndCountAll({
			attributes: ["img", "title", "createdAt"],
			offset: offset,
			limit: 6,
		});

		const imgs = [];
		const titles = [];
		const dates = [];
		for (let i = 0; i < 6; i++) {
			imgs.push(posts.rows[i].img);
			titles.push(posts.rows[i].title);
			dates.push(posts.rows[i].createdAt);
		}
		console.log(posts.count);
		res.render("gallery", {
			title: titles,
			thumb: imgs,
			date: dates,
			posts: posts.count,
		});
	} catch {
		console.error(error);
		next(error);
	}
});

router.get(
	"/post",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.render("post");
	}
);

router.get("/join", (req, res) => {
	res.render("join");
});

router.post("/auth/tokens", authTokenController.create);

module.exports = router;
