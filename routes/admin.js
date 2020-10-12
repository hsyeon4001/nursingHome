const express = require("express");
const { Post, User } = require("../models");
const jwtController = require("./jwtController");
const accessController = require("./accessController");

const router = express.Router();

router.get("/", jwtController.verify, accessController.chkAdmin, (req, res) => {
    let user = null;

    if (res.locals.user) {
        user = res.locals.user;
    }

    res.render("index", { sub: "Admin", path: "관리", headline: "관리 메뉴", user: user });
});

router.get("/users", jwtController.verify, accessController.chkAdmin, async (req, res, next) => {
    let user = null;
    if (res.locals.user) {
        user = res.locals.user;
    }

    try {

        const users = await User.findAndCountAll({
            attributes: ["id", "name", "job", "created_at", "grade"],
        });

        let jobs = { socialWorker: 0, nutritionist: 0, nurse: 0 };

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

        res.render("index", {
            sub: "Admin Users",
            path: "관리",
            headline: "회원 관리",
            user: user,
            count: users.count,
            jobs: jobs,
            users: users.rows
        });

    }
    catch {
        console.log(error);
        next(error);
    }
});

router.put("/users/:id/edit", jwtController.verify, accessController.chkAdmin, async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);

    if (res.locals.user) {
        user = res.locals.user;
    }

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
})

router.delete("/users/:id/delete", jwtController.verify, accessController.chkAdmin, async (req, res, next) => {
    try {

        let id = req.params.id;
        let user = null;

        if (res.locals.user) {
            user = res.locals.user;
        }

        await User.destroy({
            where: { id: id }
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
})

router.get("/posts", jwtController.verify, accessController.chkAdmin, async (req, res, next) => {
    let user = null;
    if (res.locals.user) {
        user = res.locals.user;
    }

    try {

        const posts = await Post.findAndCountAll({
            attributes: ["postId", "category", "title", "created_at"],
        });

        let categories = { notice: 0, gallery: 0 };

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

        res.render("index", {
            sub: "Admin Posts",
            path: "관리",
            headline: "게시글 관리",
            user: user,
            count: posts.count,
            categories: categories,
            posts: posts.rows
        });

    }
    catch {
        console.log(error);
        next(error);
    }
});

router.delete("/posts/:id/delete", jwtController.verify, accessController.chkAdmin, async (req, res, next) => {
    try {

        let id = req.params.id;
        console.log(id);
        let user = null;

        if (res.locals.user) {
            user = res.locals.user;
        }

        await Post.destroy({
            where: { postId: id }
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
})



module.exports = router;