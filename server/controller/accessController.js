const { Post, User } = require("../models");

exports.chkStaff = async (req, res, next) => {
	try {
		let staffId = res.locals.user;
		if (!staffId) {
			res.clearCookie("user");
			return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`);
		}
		const staff = await User.findOne({
			where: { id: staffId },
			attributes: ["grade"],
		});

		if (staff.grade === "guest") {
			return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`);
		} else {
			next();
		}
	} catch {
		console.log(error);
		next(error);
	}
};

exports.chkAuthor = async (req, res, next) => {
	try {
		let postId = req.params.id;
		let authorId = res.locals.user;

		if (!authorId) {
			res.clearCookie("user");
			return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`);
		}
		const post = await Post.findOne({
			where: { postId: postId },
			attributes: ["authorId"],
		});

		if (post.authorId !== authorId) {
			return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`);
		} else {
			next();
		}
	} catch {
		console.log(error);
		next(error);
	}
};

exports.chkAdmin = async (req, res, next) => {
	try {
		let userId = res.locals.user;

		if (!userId) {
			res.clearCookie("user");
			return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`);
		}
		const user = await User.findOne({
			where: { id: userId },
			attributes: ["grade"],
		});

		if (user.grade !== "administrator") {
			return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`);
		} else {
			next();
		}
	} catch {
		console.log(error);
		next(error);
	}
};
