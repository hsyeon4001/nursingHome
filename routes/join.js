const express = require("express");
const bcryptjs = require("bcryptjs");

const { Post, User } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
	let password = req.body.password;
	let grade = "guest";
	console.log('why here?');
	try {
		const userCnt = await User.count();
		if (userCnt === 0) {
			grade = "administrator";
		}

		await bcryptjs.genSalt(10, (_, salt) => {
			bcryptjs.hash(password, salt, (_, hash) => {
				password = hash;
				console.log((req.body.id).length, (req.body.password).length, (req.body.name).length, (req.body.job).length, grade.length);
				User.create({
					id: req.body.id,
					password: password,
					name: req.body.name,
					job: req.body.job,
					grade: grade
				});

				res.redirect("/");
			})
		})
	}
	catch (error) {
		console.error(error);
		next(error);
	}
})

router.post("/overlap", async (req, res) => {
	try {
		let overlap = false;

		const id = await User.findOne({
			where: { id: req.body.id }
		})
		if (id) {
			overlap = true;
		}

		res.json(JSON.stringify({ result: overlap }));
	}
	catch (error) {
		console.error(error);
		next(error);
	}
})
module.exports = router;
