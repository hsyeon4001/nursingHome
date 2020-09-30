const { Post, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.create = async (req, res, next) => {
    let id = req.body.id;
    try {
        let token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        const user = await User.findOne({
            where: { id: id },
            attributes: ["password"]
        })

        bcryptjs.compare(req.body.password, user.password, (err, compared) => {
            if (err || compared === false) {
                throw (err);
            }
        })

        res.cookie("user", token);
        return res.redirect("/");

        //     , (err, res) => {
        //     console.log(res);
        //     res.cookie("user", token);
        //     // return res.redirect("/");
        // })

    }
    catch {
        console.log(error);
        next(error);
    }
};

exports.verify = (req, res, next) => {
    let token = req.cookies["user"];
    if (!token) {
        next();
    }

    let verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
        res.clearCookie("user");
    } else {
        res.locals.user = verified.id;
    }
    next();

}