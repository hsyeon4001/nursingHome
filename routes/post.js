const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwtController = require("./jwtController");
const accessController = require("./accessController");

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



router.post("/", jwtController.verify, accessController.chkStaff, upload.single("url"), async (req, res, next) => {
	console.log(req.file, req.body);
	let url = ``;
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	if (req.file) {
		url = `/uploads/${req.file.filename}`;
	}
	// const url = `/uploads/${req.file.filename}`;

	try {
		await Post.create({
			category: req.body.category,
			title: req.body.title,
			description: req.body.description,
			img: url,
			authorId: user,
		});
		console.log("here");

		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get("/:id/edit", jwtController.verify, accessController.chkAuthor, async (req, res) => {
	const id = req.params.id;

	try {
		let user = null;

		if (res.locals.user) {
			user = res.locals.user;
		}

		const post = await Post.findOne({
			where: { postId: id },
			attributes: ["title", "description", "img", "category"],
		})

		console.log(post);
		res.render("index", {
			sub: "Edit",
			path: "늘봄소식",
			headline: "게시글수정",
			title: post.title,
			description: post.description,
			category: post.category,
			id: id,
			user: user
		});
	}
	catch {
		console.error(error);
		next(error);
	}
});

router.put("/:id/edit", jwtController.verify, accessController.chkAuthor, upload.single("url"), async (req, res, next) => {
	console.log(req.params);
	let id = req.params.id;
	let url = ``;
	let user = null;

	if (res.locals.user) {
		user = res.locals.user;
	}

	if (req.file) {
		url = `/uploads/${req.file.filename}`;
	}
	// const url = `/uploads/${req.file.filename}`;

	try {

		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"]
		})
		console.log(prevPost, prevPost.img);
		await Post.update({
			category: req.body.category,
			title: req.body.title,
			description: req.body.description,
			img: url,
			authorId: user,
		}, {
			where: { postId: id }
		});

		const path = `../nursinghome/${prevPost.img}`;
		if (prevPost.img !== '' && path) {
			fs.unlink(path, function (err) {
				if (err) throw err;
				console.log('file deleted');
			});
		}

		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete("/:id/delete", jwtController.verify, accessController.chkAuthor, async (req, res, next) => {
	try {

		console.log('delete');
		let id = req.params.id;
		let user = null;

		if (res.locals.user) {
			user = res.locals.user;
		}

		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"]
		})

		await Post.destroy({
			where: { postId: id }
		});

		if (prevPost.img !== '' && path) {
			const path = `../nursinghome/${prevPost.img}`;

			fs.unlink(path, function (err) {
				if (err) throw err;
				console.log('file deleted');
			})
		}

		res.send(`
                    <script>
                    alert('삭제되었습니다.');
                    location.replace("/");
                    </script>`);
	}
	catch (error) {
		console.error(error);
		next(error);
	}
})
module.exports = router;
