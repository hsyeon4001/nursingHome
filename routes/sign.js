const express = require("express");
const passport = require("passport");
const { Post, User } = require("../models");
const authTokenController = require("./authTokenController.js");

const router = express.Router();

router.post("/in", authTokenController.create);

module.exports = router;