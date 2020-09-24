const express = require("express");
const passport = require("passport");
const { Post, User } = require("../models");
const authTokenController = require("./authTokenController.js");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("main");
});

router.get("/gallery/:page", async (req, res) => {
	let page = req.params.page;
	let offset = 0;

	try {

		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const posts = await Post.findAndCountAll({
			attributes: ["postId", "img", "title", "created_at"],
			offset: offset,
			limit: 6,
		});

		const imgs = [];
		const titles = [];
		const dates = [];
		const ids = [];

		for (let i = 0; i < posts.rows.length; i++) {
			let date = (posts.rows[i].created_at).substring(0, 10);
			dates.push(date);
			imgs.push(posts.rows[i].img);
			titles.push(posts.rows[i].title);
			ids.push(posts.rows[i].postId);
		}

		console.log(ids);
		res.render("gallery", {
			sub: "Gallery",
			path: "늘봄소식",
			headline: "갤러리",
			ids: ids,
			titles: titles,
			thumb: imgs,
			dates: dates,
			posts: posts.count,
		});
	} catch {
		console.error(error);
		next(error);
	}
});

router.get(
	"/post",
	// passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.render("post");
	}
);

router.get("/join", (req, res) => {
	res.render("join");
});

router.get("/introduction", (req, res) => {
	res.render("sub", { sub: "Introduction", path: "시설소개", headline: "늘봄소개" });
});

router.get("/way", (req, res) => {
	res.render("sub", { sub: "Way", path: "시설소개", headline: "오시는길" });
});

router.get("/admit", (req, res) => {
	res.render("sub", { sub: "Admit", path: "입소안내", headline: "입소절차" });
});

router.get("/space", (req, res) => {
	res.render("sub", { sub: "Space", path: "입소안내", headline: "늘봄공간" });
});

router.get("/notice", (req, res) => {
	res.render("sub", { sub: "Notice", path: "늘봄소식", headline: "공지사항" });
});

router.get("/board", (req, res) => {
	res.render("sub", { sub: "Board", path: "늘봄소식", headline: "게시판" });
});

router.get("/agency", (req, res) => {
	res.render("sub", { sub: "Agency", path: "문의하기", headline: "유관기관" });
});

router.get("/counseling", (req, res) => {
	res.render("sub", { sub: "Counseling", path: "문의하기", headline: "상담신청" });
});

router.post("/auth/tokens", authTokenController.create);

module.exports = router;
