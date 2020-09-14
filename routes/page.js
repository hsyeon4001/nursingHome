const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("main");
});

router.get("/gallery", (req, res) => {
	res.render("gallery");
});
module.exports = router;
