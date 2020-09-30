const express = require("express");
const { Post, User } = require("../models");
const jwtController = require("./jwtController");

const router = express.Router();

router.get("/", jwtController.verify, (req, res) => {
    let user = null;

    if (res.locals.user) {
        user = res.locals.user;
    }
    console.log(user);
    res.render("index", { sub: "Admin", path: "관리", headline: "관리 메뉴", user: user });
});

router.get("/users", jwtController.verify, (req, res) => {
    let user = null;

    if (res.locals.user) {
        user = res.locals.user;
    }
    console.log(user);
    res.render("index", { sub: "Admin Users", path: "관리", headline: "회원 관리", user: user });

});

router.get("/posts", jwtController.verify, (req, res) => {
    let user = null;

    if (res.locals.user) {
        user = res.locals.user;
    }
    console.log(user);
    res.render("index", { sub: "Admin Posts", path: "관리", headline: "게시물 관리", user: user });

});



module.exports = router;