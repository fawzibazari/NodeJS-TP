let express = require("express");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const userModel = require("../models/models");
const Contacts = require("../models/contacts");
const userServices = require("../services/User.service");
const XLSX = require("xlsx");
const passport = require("passport");

async function register(req, res, next) {
  const { username, email, password } = req.body;

  let errors = [];
  //Validation pass
  const newUser = new userModel({
    username,
    email,
    password,
  });

  //hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      //hashae du mdp
      newUser.password = hash;
      //save du User
      newUser.save().then((user) => {
        res.redirect("/");
      });
    });
  });
  console.log(newUser);
  // res.send('hellodd')
}

async function login(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
})(req, res, next);
}

async function findById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

async function GenerateExcel(req, res, next) {
  userServices.getById(req.params.id).then(async (user) => {
    let table = [];
    for (const key in user.contacts) {
      const ContactObject = user.contacts[key];
      const newContact = await Contacts.findById(ContactObject);
      table.push(newContact);
    }
    const workSheet = XLSX.utils.json_to_sheet(table);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "table");
    // Generate buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "studentsData.xlsx");
    res.json(user.contacts);
  });
}

async function newUserContact(req, res, next) {
  const newContact = new Contacts(req.body);
  newContact.user = await User.findById(req.params.id);
  await newContact.save();

  const user = await User.findByIdAndUpdate(req.params.id, {
    $push: { contacts: newContact },
  });

  res.status(200).json(newContact);
}

module.exports = {
  register,
  login,
  findById,
  newUserContact,
  GenerateExcel,
};
