const { Post, User } = require("../models");


exports.chkStaff = async (req, res, next) => {
    try {
        let userId = res.locals.user;
        console.log(userId);
        if (!userId) {
            return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`)
        }
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["grade"],
        })
        console.log(user.grade);

        if (user.grade === "guest") {
            return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`)
        } else {
            next();
        }

    }
    catch {
        console.log(error);
        next(error);
    }
};

exports.chkAuthor = async (req, res, next) => {
    try {
        let postId = req.params.id;
        let userId = res.locals.user;

        if (!userId) {
            return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`)
        }
        const post = await Post.findOne({
            where: { postId: postId },
            attributes: ["authorId"],
        })

        if (post.authorId !== userId) {
            return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`)
        } else {
            next();
        }

    }
    catch {
        console.log(error);
        next(error);
    }
};

exports.chkAdmin = async (req, res, next) => {
    try {
        let userId = res.locals.user;

        if (!userId) {
            return res.send(`<script>
            alert('로그인 후 이용 가능합니다.');
            history.back();
            </script>`)
        }
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["grade"],
        })

        if (user.grade !== "administrator") {
            return res.send(`<script>
            alert('접근 권한이 없습니다.');
            history.back();
            </script>`)
        } else {
            next();
        }

    }
    catch {
        console.log(error);
        next(error);
    }
};