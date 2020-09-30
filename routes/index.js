const express = require("express");
const { Post, User } = require("../models");
const jwtController = require("./jwtController");

const router = express.Router();

router.get("/", jwtController.verify, (req, res) => {

	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}
	console.log('main');
	res.render("index", { sub: "Main", user: user });
});

router.get(
	"/post", jwtController.verify,
	(req, res) => {
		let user = null;

		if (res.locals.user) {
			user = res.locals.user;
		}
		res.render("index", { sub: "Post", path: "늘봄소식", headline: "게시글작성", user: user });
	}
);

router.get("/gallery/:page", jwtController.verify, async (req, res) => {
	console.log('hello');

	let page = req.params.page;
	let offset = 0;
	let user = null;
	console.log('1');

	if (res.locals.user) {
		user = res.locals.user;
	}

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
			console.log('date');
			dates.push(date);
			imgs.push(posts.rows[i].img);
			titles.push(posts.rows[i].title);
			ids.push(posts.rows[i].postId);
		}
		console.log('2');

		res.render("index", {
			sub: "Gallery",
			path: "늘봄소식",
			headline: "갤러리",
			ids: ids,
			titles: titles,
			thumb: imgs,
			dates: dates,
			posts: posts.count,
			user: user
		});
	} catch {
		console.error(error);
		next(error);
	}
});


router.get("/notice", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Notice", path: "늘봄소식", headline: "공지사항", user: user });
});


router.get("/join", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Join", path: "회원관리", headline: "회원가입", user: user });
});

router.get("/introduction", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Introduction", path: "시설소개", headline: "늘봄소개", user });
});

router.get("/way", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Way", path: "시설소개", headline: "오시는길", user: user });


});

router.get("/admit", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Admit", path: "입소안내", headline: "입소절차", user: user });
});

router.get("/space", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Space", path: "입소안내", headline: "늘봄공간", user: user });
});

router.get("/agency", jwtController.verify, (req, res) => {

	res.render("index", { sub: "Agency", path: "문의하기", headline: "유관기관", user: user });
});

router.get("/counseling", jwtController.verify, (req, res) => {
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	res.render("index", { sub: "Counseling", path: "문의하기", headline: "상담신청", user: user });
});

router.get("/gallery/:page/id/:id", jwtController.verify, async (req, res) => {
	const id = req.params.id;
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}
	try {

		const post = await Post.findOne({
			where: { postId: id },
			attributes: ["title", "description", "img", "created_at", "authorId"],
		})

		const date = (post.created_at).substring(0, 10);

		res.render("index", {
			sub: "Gallery Detail",
			path: "늘봄소식",
			headline: "갤러리",
			title: post.title,
			description: post.description,
			img: post.img,
			date: date,
			author: post.authorId,
			id: id,
			user: user
		});
	}
	catch {
		console.error(error);
		next(error);
	}
});

module.exports = router;
