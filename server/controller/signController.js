const bcryptjs = require("bcryptjs");

const { User } = require("../models");

exports.createUser = async (req, res, next) => {
	try {
        let password = req.body.password;
        let grade = "guest";
    
        await User.count()
            .then(count => {
                if (count === 0) {
                    grade = "administrator";
                }
            })

		await bcryptjs.genSalt(10, (_, salt) => {
			bcryptjs.hash(password, salt, (_, hash) => {
				password = hash;
                User.create({
					id: req.body.id,
					password: password,
					name: req.body.name,
					job: req.body.job,
					grade: grade
				});
			});
        });
        
        res.redirect("/");
	}
	catch (error) {
		console.error(error);
		next(error);
	}
}

exports.checkDuplication = async (req, res, next) => {
    try {
		let duplication = false;

		const id = await User.findOne({
			where: { id: req.body.id }
        })
        
		if (id) {
			duplication = true;
		}

		res.json(JSON.stringify({ result: duplication }));
	}
	catch (error) {
		console.error(error);
		next(error);
	}
}

exports.signOut = async (req, res, next) => {
	res.clearCookie("user");
    res.redirect("/");
}