const express = require("express");
const bcryptjs = require("bcryptjs");

const { Post, User } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
	let password = req.body.password;

	try {
		await bcryptjs.genSalt(10, (_, salt) => {
			bcryptjs.hash(password, salt, (_, hash) => {
				password = hash;

				User.create({
					id: req.body.id,
					password: password,
					name: req.body.name,
					job: req.body.job,
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


// 	  User.create({ email, nickName, password, provider, profileImg })
// 		.then(_ => {
// 		  res.status(201);
// 		  res.send(true);
// 		})
// 		.catch(err => {
// 		  res.status(500);
// 		  res.send(err);
// 		});
// 	});
//   });

// try {

// } catch (error) {
// 	console.error(error);
// 	next(error);
// }


module.exports = router;
