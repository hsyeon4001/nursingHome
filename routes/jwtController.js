const { Post, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.create = async (req, res, next) => {
    let id = req.body.id;
    try {
        let token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "20m" });
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
    try {
        let token = req.cookies["user"];

        if (!token) {
            next();
        }
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie("user");
                } else {
                    res.locals.user = decoded.id;
                    console.log('complete');
                }
            });
            next();
        }

    }
    catch {
        console.log(error);
        next(error);
    }


}