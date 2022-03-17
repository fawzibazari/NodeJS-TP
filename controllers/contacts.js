const express = require('express');
const Contacts = require('../models/contacts');
const router = express.Router();

//Récupération des contacts:
const getcontacts = async (req, res) => {
    try {
        const contact= await Contacts.find();
        
        res.status(200).json(contact);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

//Création d'un contact
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

//Mise à jour d'un contact
const updatecontact = async (req, res) => {
    
    const user = await Contacts.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            firstname:req.body.firstname,
            email:req.body.email,
            number:req.body.number,
            created_on:req.body.created_on
        }
    )   
    if(!user){
        return res.status(400).send('Le contact ne peut pas être modifié')
    }
    else{
        await res.send(user);
    }
}

//Suppression d'un contact
const deletecontact = async (req, res) => {
    
        const user = await Contacts.findByIdAndRemove(req.params.id)
        if(!user){
            return res.status(400).send("Le contact n'existe pas")
        }
        else{
            await res.send(user);
        }
}

//Export des fonctions:
module.exports = {
    getcontacts,
    createcontact,
    updatecontact,
    deletecontact
}