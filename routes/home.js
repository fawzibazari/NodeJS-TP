var express = require('express');
var router = express.Router();
var test = require('../cont');
const Contacts = require("../models/contacts");
const userServices = require("../services/User.service");
router.get('/', function(req, res, next) {

  let table = [];

  userServices.getById(req.user.id).then(async (user) => {
    for (const key in user.contacts) {
      const ContactObject = user.contacts[key];
      const newContact = await Contacts.findById(ContactObject);
      table.push(newContact);
    }
    // res.json(table);
    res.render('pages/Home/home', { title: 'Express',test:table });
  });
  
  
});

module.exports = router ;



