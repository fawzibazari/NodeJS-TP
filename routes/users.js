var express = require("express");
const {
  register,
  addContact,
  login,
  findById,
  newUserContact,
  GenerateExcel,
  getAllUserContacts
} = require("../controller/user");
var router = express.Router();
const userModel = require("../models/models");
const passport = require("passport");


/* GET users listing. */
router.get("/", async function (request, response) {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Create a new user
router.get("/register", (req, res) => res.render("pages/register"));
router.post("/register", register);
router.get("/home/addContact", (req, res) => res.render("pages/Home/addContact"));
router.post("/home/addContact", addContact);
router.get("/login", (req, res) => res.render("pages/login"));
router.post('/login' , (req, res, next)=> {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
})(req, res, next);
});
router.get("/:id", findById);
router.get("/:id/excel", GenerateExcel);
router.get("/:id/GetContact", getAllUserContacts), (req, res) => res.render("pages/Home/home",{test:table});
router.post("/:id/contact", newUserContact);

module.exports = router;
