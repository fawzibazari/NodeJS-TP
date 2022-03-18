let express = require("express");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const User = require("../models/models");
const Contacts = require("../models/contacts");
const userServices = require("../services/User.service");
const passport = require("passport");
const fs = require("fs");
const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Worksheet Name");


async function register(req, res, next) {
  const { username, email, password } = req.body;

  let errors = [];
  const newUser = new User({
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
  // res.send('hellodd')
}

async function addContact(req, res, next) {
  const { name, firstname, email, number } = req.body;
  const user = req.user.id;

  let errors = [];
  const newUser = new Contacts({
    name,
    firstname,
    email,
    number,
    user
  });

  //hash password
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) throw err;
  //     //hashae du mdp
  //     newUser.password = hash;
  //     //save du User
      newUser.save().then((user) => {
        res.redirect("/home");
      });
  //   });
  // });
  // res.send('hellodd')
}

async function login(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })(req, res, next);
}

async function findById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

async function GenerateExcel(req, res, next) {
  userServices.getById(req.user.id).then(async (user) => {
    let table = [];
    for (const key in user.contacts) {
      const ContactObject = user.contacts[key];
      const newContact = await Contacts.findById(ContactObject);
      table.push(newContact);
    }
    const ExcelStringArr = await JSON.stringify(table);

    const ExcelFinalArr = JSON.parse(ExcelStringArr)

    //définir les colonne
    const headingColumnNames = [
      "Name",
      "Firstname",
      "email",
      "Mobile",
      "registered_on",
      "user",
      "id",
    ];

    //Ecrire les colonne
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });

    //Ecrire les données dans le excel
    let rowIndex = 2;
    ExcelFinalArr.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write("contact.xlsx");
    res.download(`./contact.xlsx`)
  });
}

async function getAllUserContacts(req, res, next) {
  userServices.getById(req.params.id).then(async (user) => {
    let table = [];
    for (const key in user.contacts) {
      const ContactObject = user.contacts[key];
      const newContact = await Contacts.findById(ContactObject);
      table.push(newContact);
    }
    res.json(table);
    return table
  });
}
async function newUserContact(req, res, next) {
  const newContact = new Contacts(req.body);
  newContact.user = await User.findById(req.user.id);
  await newContact.save();

  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { contacts: newContact },
  });
  res.redirect("/home");
}

module.exports = {
  register,
  login,
  findById,
  newUserContact,
  GenerateExcel,
  getAllUserContacts,
  addContact,
};
