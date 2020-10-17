const renderVariables = require("./renderVariables").indexVariables;
const routesVariables = require("../routes/routesVariables").routesVariables;
const { User, Post } = require("../models");

exports.readUserAdmin = async (req, res, next) => {
    try {
        let jobs = { socialWorker: 0, nutritionist: 0, nurse: 0 };

        const readUserList = await User.findAndCountAll({
            attributes: ["id", "name", "job", "created_at", "grade"],
        }).then(users => {
            for (let i = 0; i < users.count; i++) {
                switch (users.rows[i].job) {
                    case "social_worker":
                        jobs.socialWorker += 1;
                        break;
                    case "nutritionist":
                        jobs.nutritionist += 1;
                        break;
                    case "nurse":
                        jobs.nurse = jobs.nurse + 1;
                        break;
                }
            }
            return { count: users.count, jobs: jobs, users: users.rows }
        })
        
        res.locals.readUserList = readUserList;

        next();
    }
    catch {
        console.log(error);
        next(error);
    }
}

exports.updateUserAdmin = async (req, res, next) => {
    try {
        await User.update({
            grade: req.body.grade
        },
            {
                where: { id: req.params.id }
            })

        res.send(`
            <script>
            alert('변경되었습니다.');
            location.href = "/admin/users";
            </script>`);
    }
    catch {
        console.log(error);
        next(error);
    }
}

exports.deleteUserAdmin = async (req, res, next) => {
    try {
        await User.destroy({
            where: { id: req.params.id }
        });

        res.send(`
            <script>
            alert('탈퇴가 처리되었습니다.');
            location.href = "/admin/users";
            </script>`);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}

exports.readPostAdmin = async (req, res, next) => {
    try {
        let categories = { notice: 0, gallery: 0 };

        const readPostList = await Post.findAndCountAll({
            attributes: ["postId", "category", "title", "created_at"],
        }).then(posts => {
            for (let i = 0; i < posts.count; i++) {
                switch (posts.rows[i].category) {
                    case "notice":
                        categories.notice += 1;
                        break;
                    case "gallery":
                        categories.gallery += 1;
                        break;
                }
            }
            return { count: posts.count, categories: categories, posts: posts.rows }
        })

        res.locals.readPostList = readPostList;

        next();
    }
    catch {
        console.log(error);
        next(error);
    }
}

exports.deletePostAdmin = async (req, res, next) => {
    try {
        await Post.destroy({
            where: { postId: req.params.id }
        });

        res.send(`
            <script>
            alert('삭제되었습니다.');
            location.href = "/admin/posts";
            </script>`);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}