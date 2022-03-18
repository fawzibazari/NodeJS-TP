const Contacts = require('../models/contacts');
const userServices = require("../services/User.service");
const User = require('../models/models');


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
        created_on:req.body.created_on,
})
    try {
          await newcontact.save();
        res.status(201).json(newcontact);
} catch(error) {
        res.status(400).json({ message : error.message});
    }
}

//addContact avec User
async function newContactUser(req, res, next) {
    const addContact = new Contacts(req.body);
    addContact.user = await User.findById(req.params.id);
    await addContact.save();
  
    //Mise à jour du tableau
    const user = await User.findByIdAndUpdate(req.params.id, {
        $push: { contacts: addContact },
      });
  
    res.status(200).json(user);
  }

  //updateContact avec User
// async function updateContact(req, res, next) {
//   const addContact = new Contacts(req.body);
//   addContact.user = await User.findById(req.params.id);
//   await addContact.save();

//     //Mise à jour du tableau
//     const user = await User.findByIdAndUpdate(req.params.id, {
//         $push: { contacts: addContact },
//       });

//   res.status(200).json(user);
// }

//showContact
async function getAllUserContacts(req, res, next) {
  userServices.getById(req.params.id).then(async (user) => {
    let table = [];
    for (const key in user.contacts) {
      const ContactObject = user.contacts[key];
      const newContact = await Contacts.findById(ContactObject);
      table.push(newContact);
    }
    res.json(table);
  });
}

//Mise à jour d'un contact
const updateContact = async (req, res) => {
    
  const user = await Contacts.findById(req.params.user_id)
  const contact = await Contacts.findByIdAndUpdate(
      req.params.id,
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
      await res.send(contact);
  }
}

//Suppression d'un contact
const deletecontact = async (req, res) => {

        const contact = await Contacts.findByIdAndDelete(req.params.contact_id)
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).send("Le contact n'existe pas")
        }
        else{
          //mise à jour de la table
          const user = await User.findByIdAndUpdate(req.params.id, {
            $push: { contacts: contact },
          });
            await res.send(contact);
        }
}


//Solution 2 addContact
async function createContact1(req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const contact1 = new Contacts({
        name:req.body.name,
        firstname:req.body.firstname,
        email:req.body.email,
        number:req.body.number,
        created_on:req.body.created_on
    });

    contact1.user = await User.findById(req.params.id);
    console.log(contact1);
    // Save Tutorial in the database
    contact1
      .save(contact1)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
  

module.exports = {
    getcontacts,
    newContactUser,
    updateContact,
    getAllUserContacts,
    deletecontact
}