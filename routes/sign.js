const express = require("express");
const { Post, User } = require("../models");
const jwtController = require("./jwtController");
require("dotenv").config();

const router = express.Router();

router.post("/in", jwtController.create);

router.get("/out", (req, res, next) => {
    res.clearCookie("user");
    res.redirect("/");
});


module.exports = router;