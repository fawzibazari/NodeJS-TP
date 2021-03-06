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



//Suppression d'un contact
const deletecontact = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    const contact = await Contacts.findByIdAndDelete(req.params.contact_id)
    // const usercontact = await Contacts.findByIdAndDelete(req.params.contact_id)

    if(!user){
        return res.status(400).send("Le contact n'existe pas")
    }
    else{
      //mise à jour de la table
      await userModel.findByIdAndUpdate(req.user.id, {
        $push: { contacts: contact },
      });
        res.redirect("/home");  
    }
}


//Mise à jour d'un contact
const updateContact = async (req, res) => {
    const id = req.body.id_contact
    const user = await Contacts.findById(req.user.id)
    const contact = await Contacts.findByIdAndUpdate(
        id,
        {
            name:req.body.name,
            firstname:req.body.firstname,
            email:req.body.email,
            number:req.body.number,
            created_on:req.body.created_on
        }
    )   
    if(!contact){
        return res.status(400).send('Le contact ne peut pas être modifié')
    }
    else{
        res.redirect("/home");
    }
  }
  
module.exports = {
    getcontacts,
    createcontact,
    deletecontact,
    updateContact
}