const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const { Post } = require("../models");

// fs.readdir("uploads", (error) => {
// 	if (error) {
// 		console.error("upload폴더가 없어 upload폴더를 생성합니다.");
// 		fs.mkdirSync("uploads");
// 	}
// });

AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: "ap-northeast-2",
});

exports.upload = multer({
	storage: multerS3({
		s3: new AWS.S3(),
		bucket: "nursing-home-images",
		key(req, file, cb) {
			cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

exports.createPost = async (req, res, next) => {
	let url = ``;
	console.log(req.file);
	if (req.file) {
		url = req.file.location;
		// url = originalUrl.replace(/\/original\//, "/thumb/");
		// url = `/uploads/${req.file.filename}`;
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
};

exports.readPostEdit = async (req, res, next) => {
	try {
		const id = req.params.id;

		const readPostEdit = await Post.findOne({
			where: { postId: id },
			attributes: ["postId", "title", "description", "img", "category"],
		}).then((post) => {
			return post.dataValues;
		});

		res.locals.readPostEdit = readPostEdit;

		next();
	} catch {
		console.error(error);
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		const id = req.params.id;
		let url = ``;

		if (req.file) {
			url = `/uploads/${req.file.filename}`;
		}
		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"],
		}).then((post) => {
			return post;
		});

		await Post.update(
			{
				category: req.body.category,
				title: req.body.title,
				description: req.body.description,
				img: url,
				authorId: res.locals.user,
			},
			{
				where: { postId: id },
			}
		);

		const path = `../nursinghome/${prevPost.img}`;

		if (prevPost.img !== "" && path) {
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
};

exports.deletePost = async (req, res, next) => {
	try {
		const id = req.params.id;

		const prevPost = await Post.findOne({
			where: { postId: id },
			attributes: ["img"],
		}).then((post) => {
			return post;
		});

		await Post.destroy({
			where: { postId: id },
		});

		const path = `../nursinghome/${prevPost.img}`;

		if (prevPost.img !== "" && path) {
			fs.unlink(path, function (err) {
				if (err) throw err;
			});
		}

		res.send(`
                    <script>
                    alert('삭제되었습니다.');
                    location.replace("/");
					</script>
				`);
	} catch (error) {
		console.error(error);
		next(error);
	}
};
