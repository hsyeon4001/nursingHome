const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const { Post } = require("../models");

const s3 = new AWS.S3({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: "ap-northeast-2",
});

exports.upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: "nursing-home-images",
		key(req, file, cb) {
			cb(
				null,
				`original/${+new Date()}${path
					.basename(file.originalname)
					.toLowerCase()}`
			);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteS3 = async (prevPost) => {
	const prevUrl = prevPost.img.split("/");
	const fileName = decodeURIComponent(prevUrl[prevUrl.length - 1]);
	const params = {
		Bucket: "nursing-home-images",
		Delete: {
			Objects: [
				{
					Key: `resized/${fileName}`,
				},
				{
					Key: `original/${fileName}`,
				},
			],
		},
	};

	await s3
		.deleteObjects(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
			} else console.log(data);
		})
		.promise();
};

exports.createPost = async (req, res, next) => {
	let url = ``;

	if (req.file) {
		const originalUrl = req.file.location;
		const ext = originalUrl.split(".")[originalUrl.split(".").length - 1];
		url = originalUrl.replace(/\/original\//, "/resized/");
		url = url.replace(`.${ext}`, ".jpg");
		console.log(ext, url);
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
			const originalUrl = req.file.location;
			const ext = originalUrl.split(".")[originalUrl.split(".").length - 1];
			url = originalUrl.replace(/\/original\//, "/resized/");
			url = url.replace(`.${ext}`, ".jpg");
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

		await deleteS3(prevPost);

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

		await deleteS3(prevPost);

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
