const { Post, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.create = async (req, res, next) => {
    try {
        const id = req.body.id;
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "20m" });
        const user = await User.findOne({
            where: { id: id },
            attributes: ["password"]
        })

        bcryptjs.compare(req.body.password, user.password, (err, compared) => {
            if (err) {
                throw (err);
            }
            else if (compared === false) {
                return res.send(`
                    <script>
                    alert('아이디 혹은 비밀번호가 맞지 않습니다.');
                    location.href = "/";
                    </script>`);
            }
            else {
                res.cookie("user", token, { httpOnly: true });
                return res.redirect("/");
            }
        })
    }
    catch {
        console.log(error);
        next(error);
    }
};

exports.verify = (req, res, next) => {
    try {
        const token = req.cookies["user"];

        if (!token) {
            res.locals.user = null;
            next();
        }
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie("user");
                } else {
                    res.locals.user = decoded.id;
                }
            });
            console.log("jwtController.verify passed");
            next();
        }

    }
    catch {
        console.log(error);
        next(error);
    }


}