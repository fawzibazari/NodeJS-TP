var express = require("express");
const {
  register,
  addContact,
  login,
  findById,
  newUserContact,
  GenerateExcel,
  getAllUserContacts,
} = require("../controller/user");

const { ensuteAuthenticated,  } = require('../utils/middleware');

const {
  deletecontact,
  updateContact
} = require("../controller/contacts");
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
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get("/register", (req, res) => res.render("pages/register"));
router.post("/register", register);
router.get("/home/addContact", ensuteAuthenticated, (req, res) => res.render("pages/Home/addContact"));
router.post("/home/addContact", newUserContact);
router.get("/home/updatecontact/:id",ensuteAuthenticated, (req, res) => res.render("pages/Home/UpdateContact", {id: req.params.id}));
router.post("/home/updatecontact/:id",updateContact );

router.get("/login", (req, res) => res.render("pages/login"));
router.post('/login' , (req, res, next)=> {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
})(req, res, next);
});
// router.get('/home')
router.get('/home/delete/:contact_id',ensuteAuthenticated, deletecontact, (req, res) => res.render("pages/Home/home") );
router.get('/home/excel',ensuteAuthenticated, GenerateExcel, (req, res) => res.render("pages/Home/home") );
router.get("/:id", findById);
router.get("/:id/excel", GenerateExcel);
router.get("/:id/GetContact",ensuteAuthenticated, getAllUserContacts,), (req, res) => res.render("pages/Home/home",{test:table});
router.post("/:id/contact", newUserContact);



module.exports = router;
