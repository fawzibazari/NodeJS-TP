var express = require('express');
var router = express.Router();
var test = require('../cont');
const Contacts = require("../models/contacts");
const userServices = require("../services/User.service");
const { jsPDF } = require("jspdf")

/* GET home page. */
router.get('/:id', function(req, res, next) {
    id = req.params.id 

    let table = [];

    userServices.getById(req.user.id).then(async (user) => {
      for (const key in user.contacts) {
        const ContactObject = user.contacts[key];
        const newContact = await Contacts.findById(ContactObject);
        table.push(newContact);
      }
      // res.json(table);
      console.log(table)
      res.render('pages/Home/infoContact', { title: 'Express',test:table,id:id });
    });

    // res.render('pages/Home/infoContact', { title: 'Express',id:id,test:test});
});

module.exports = router;
