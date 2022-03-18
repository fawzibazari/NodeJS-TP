var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const passport = require("passport");
const session = require('express-session');

require("./utils/passport")(passport);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var homeRouter = require("./routes/home");
// var addContactRouter = require("./routes/addContact");
var infoContactRouter = require("./routes/infoContact");

//Mongoose connection
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
var app = express();


//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/home", homeRouter);
// app.use("/home/addContact", addContactRouter);
app.use("/home/infoContact", infoContactRouter);


//Contact:
const studentrouter = require("./routes/contacts");
app.use("/contact", studentrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
console.log("Server is running at http://localhost:3000/ 😁😁");
module.exports = app;
