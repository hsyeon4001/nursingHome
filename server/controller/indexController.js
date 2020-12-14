const renderVariables = require("./renderVariables").indexVariables;
const routesVariables = require("../routes/routesVariables").routesVariables;

// const logger = require("../logs/logger");
const { Post, Op } = require("../models");

exports.renderPage = (req, res) => {
	const user = res.locals.user;
	const posts = res.locals.readPosts;
	const postView = res.locals.readPostView;
	const postEdit = res.locals.readPostEdit;
	const userList = res.locals.readUserList;
	const postList = res.locals.readPostList;
	const paths = Object.entries(routesVariables);

	if (posts) {
		pageVariables = {
			ids: posts.ids,
			titles: posts.titles,
			thumb: posts.imgs,
			dates: posts.dates,
			posts: posts.count,
			user: user,
		};
	} else if (postView) {
		pageVariables = {
			id: postView.postId,
			title: postView.title,
			description: postView.description,
			img: postView.img,
			date: postView.created_at,
			author: postView.authorId,
			user: user,
		};
	} else if (postEdit) {
		pageVariables = {
			title: postEdit.title,
			description: postEdit.description,
			category: postEdit.category,
			id: postEdit.postId,
			user: user,
		};
	} else if (userList) {
		pageVariables = {
			count: userList.count,
			jobs: userList.jobs,
			users: userList.users,
			user: user,
		};
	} else if (postList) {
		pageVariables = {
			count: postList.count,
			categories: postList.categories,
			posts: postList.posts,
			user: user,
		};
	} else {
		pageVariables = { user: user };
	}

	if (req.route.path === "/way") {
		pageVariables["key"] = process.env.MAP_KEY;
	}

	for (const [key, value] of paths) {
		if (value.path === req.route.path && value.method === req.method) {
			return res.render(
				"index",
				Object.assign(renderVariables[key], pageVariables)
			);
		}
	}
};

exports.readPost = async (req, res, next) => {
	try {
		const page = req.params.page;
		const path = req.route.path;

		const category = path.split("/")[1];
		let offset = 0;

		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const readPosts = await Post.findAndCountAll({
			where: { category: category },
			attributes: ["postId", "img", "title", "created_at"],
			offset: offset,
			limit: 6,
		}).then((posts) => {
			const imgs = [];
			const titles = [];
			const dates = [];
			const ids = [];

			for (let i = 0; i < posts.rows.length; i++) {
				let date = posts.rows[i].created_at.substring(0, 10);
				dates.push(date);
				imgs.push(posts.rows[i].img);
				titles.push(posts.rows[i].title);
				ids.push(posts.rows[i].postId);
			}

			return { imgs, titles, dates, ids, count: posts.count };
		});

		res.locals.readPosts = readPosts;

		next();
	} catch {
		console.error(error);
		next(error);
	}
};

exports.readPostView = async (req, res, next) => {
	try {
		const postId = req.params.id;

		const readPostView = await Post.findOne({
			where: { postId: postId },
			attributes: [
				"postId",
				"title",
				"description",
				"img",
				"created_at",
				"authorId",
			],
		}).then((post) => {
			return post.dataValues;
		});

		readPostView.created_at = readPostView.created_at.substring(0, 10);

		res.locals.readPostView = readPostView;

		next();
	} catch {
		console.error(error);
		next(error);
	}
};

exports.searchPosts = async (req, res, next) => {
	try {
		const word = req.body.word;
		const category = req.headers.referer.split("/")[3];
		const page = 1;
		let offset = 0;

		if (page > 1) {
			offset = 6 * (page - 1);
		}

		const readPosts = await Post.findAndCountAll({
			where: { category: category, title: { [Op.like]: "%" + word + "%" } },
			attributes: ["postId", "img", "title", "created_at"],
			offset: offset,
			limit: 6,
		}).then((posts) => {
			const imgs = [];
			const titles = [];
			const dates = [];
			const ids = [];

			for (let i = 0; i < posts.rows.length; i++) {
				let date = posts.rows[i].created_at.substring(0, 10);
				dates.push(date);
				imgs.push(posts.rows[i].img);
				titles.push(posts.rows[i].title);
				ids.push(posts.rows[i].postId);
			}

			return { imgs, titles, dates, ids, count: posts.count };
		});

		res.locals.readPosts = readPosts;

		next();
	} catch {
		console.error(error);
		next(error);
	}
};
