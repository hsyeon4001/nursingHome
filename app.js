const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");

require("dotenv").config();

const pageRouter = require("./routes/page");
const postRouter = require("./routes/post");
const joinRouter = require("./routes/join");

const { sequelize } = require("./models");
const passportConfig = require("./config/passport");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passportConfig();

app.use("/", pageRouter);
app.use("/post", postRouter);
app.use("/join", joinRouter);

sequelize.sync();

app.use(flash());

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	res.status(err.status || 500);
	res.render("error");
});

app.listen(app.get("port"), () => {
	console.log(app.get("port"), "번 포트에서 대기 중");
});
