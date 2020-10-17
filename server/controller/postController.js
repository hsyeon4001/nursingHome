const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post } = require("../models");

fs.readdir("uploads", (error) => {
	if (error) {
		console.error("upload폴더가 없어 upload폴더를 생성합니다.");
		fs.mkdirSync("uploads");
	}
});

exports.upload = multer({
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

exports.createPost = async (req, res, next) => {
	let url = ``;

	if (req.file) {
		url = `/uploads/${req.file.filename}`;
    }

	try {
		await Post.create({
			category: req.body.category,
			title: req.body.title,
			description: req.body.description,
			img: url,
			authorId: res.locals.user,
		});
		console.log(req.route);
		res.redirect("/");
	} catch (error) {
		console.error(error);
		next(error);
	}
}

exports.readPostEdit = async (req, res, next) => {
	try {
        const id = req.params.id;

		const readPostEdit = await Post.findOne({
			where: { postId: id },
			attributes: ["postId", "title", "description", "img", "category"],
		}).then(post => { return post.dataValues });

		res.locals.readPostEdit = readPostEdit;

		next();
	}
	catch {
		console.error(error);
		next(error);
	}
}

exports.updatePost = async (req, res, next) => {
	try {
		const id = req.params.id;
		let url = ``;

		if (req.file) {
			url = `/uploads/${req.file.filename}`;
		}
		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"]
		}).then(post => { return post });

		await Post.update({
			category: req.body.category,
			title: req.body.title,
			description: req.body.description,
			img: url,
			authorId: res.locals.user,
		}, {
			where: { postId: id }
		})

		const path = `../nursinghome/${prevPost.img}`;

		if (prevPost.img !== '' && path) {
			fs.unlink(path, function (err) {
				if (err) throw err;
			});
		}
		console.log(req.route);

		res.redirect("/");

	} catch (error) {
		console.error(error);
		next(error);
	}
}

exports.deletePost = async (req, res, next) => {
	try {
		const id = req.params.id;

		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"]
		}).then(post => { return post });

		await Post.destroy({
			where: { postId: id }
		});

		const path = `../nursinghome/${prevPost.img}`;

		if (prevPost.img !== '' && path) {
			fs.unlink(path, function (err) {
				if (err) throw err;
			})
		}

		res.send(`
                    <script>
                    alert('삭제되었습니다.');
                    location.replace("/");
					</script>
				`);
	}
	catch (error) {
		console.error(error);
		next(error);
	}

}

