let express = require("express");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const userModel = require("../models/models");
const Contacts = require("../models/contacts");
const userServices = require("../services/User.service");
const User = require("../models/models");

async function register(req, res, next) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);
  userServices
    .register(req.body)
    .then(res.json("utilisateur créer 😎"))
    .catch((err) => next(err));
}

async function login(req, res, next) {
  const { username, password } = req.body;
  userServices
    .login({ username, password })
    .then((user) => {
      if (user) {
        res.json(user);
        console.log(user);
        return user;
      } else {
        res.json({ error: "Username ou password est incorrect" });
      }
    })
    .catch((err) => next(err));
}

async function findById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

async function newUserContact(req, res, next) {
  const newContact = new Contacts(req.body);
  newContact.user = await User.findById(req.params.id);
  await newContact.save();

  const user = await User.findByIdAndUpdate(req.params.id, {
    $push: { contacts: newContact }
  })

  res.status(200).json(newContact);
}

module.exports = {
  register,
  login,
  findById,
  newUserContact,
};
