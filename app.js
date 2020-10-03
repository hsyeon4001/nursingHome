const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const joinRouter = require("./routes/join");
const signRouter = require("./routes/sign");
const adminRouter = require("./routes/admin");

const { sequelize } = require("./models");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/join", joinRouter);
app.use("/sign", signRouter);
app.use("/admin", adminRouter);

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
