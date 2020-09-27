const express = require("express");
const passport = require("passport");
const { Post, User } = require("../models");
const authTokenController = require("./authTokenController.js");

const router = express.Router();

router.get("/", (req, res) => {

	res.render("main");
});

router.get(
	"/post",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		console.log('post');
		res.render("sub", { sub: "Post", path: "늘봄소식", headline: "게시글작성" });
	}
);

router.get("/gallery/:page", async (req, res) => {
	let page = req.params.page;
	let offset = 0;

	try {

		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const posts = await Post.findAndCountAll({
			where: { category: "gallery" },
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

		console.log(posts);
		res.render("gallery", {
			sub: "Gallery",
			path: "늘봄소식",
			headline: "갤러리",
			ids: ids,
			titles: titles,
			thumb: imgs,
			dates: dates,
			posts: posts.count
		});
	} catch {
		console.error(error);
		next(error);
	}
});


router.get("/notice", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Notice", path: "늘봄소식", headline: "공지사항" });
});


router.get("/join", (req, res) => {
	res.render("sub", { sub: "Join", path: "회원관리", headline: "회원가입" });
});

router.get("/introduction", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Introduction", path: "시설소개", headline: "늘봄소개" });
});

router.get("/way", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Way", path: "시설소개", headline: "오시는길" });


});

router.get("/admit", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Admit", path: "입소안내", headline: "입소절차" });
});

router.get("/space", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Space", path: "입소안내", headline: "늘봄공간" });
});

router.get("/agency", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Agency", path: "문의하기", headline: "유관기관" });
});

router.get("/counseling", (req, res) => {
	const url = req.originalUrl;
	res.render("sub", { sub: "Counseling", path: "문의하기", headline: "상담신청" });
});

router.get("/gallery/:page/id/:id", async (req, res) => {
	const id = req.params.id;

	try {

		const post = await Post.findOne({
			where: { postId: id },
			attributes: ["title", "description", "img", "created_at", "authorId"],
		})

		const date = (post.created_at).substring(0, 10);

		res.render("sub", {
			sub: "Gallery Detail",
			path: "늘봄소식",
			headline: "갤러리",
			title: post.title,
			description: post.description,
			img: post.img,
			date: date,
			author: post.authorId,
			id: id
		});
	}
	catch {
		console.error(error);
		next(error);
	}
});



router.post("/auth/tokens", authTokenController.create);

module.exports = router;
