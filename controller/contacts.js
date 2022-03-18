const Contacts = require('../models/contacts')
const userModel = require("../models/models");


const getcontacts = async (req, res) => {
    try {
        const contact= await Contacts.find();
        
        res.status(200).json(contact);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const createcontact =  async (req, res) => {
    console.log(req.body);
    const newcontact = new Contacts({
        name:req.body.name,
        firstname:req.body.firstname,
        email:req.body.email,
        number:req.body.number,
        created_on:req.body.created_on
})
    try {
          await newcontact.save();
        res.status(201).json(newcontact);
} catch(error) {
        res.status(400).json({ message : error.message});
    }
}

module.exports = {
    getcontacts,
    createcontact
}