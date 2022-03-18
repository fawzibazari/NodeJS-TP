const express = require("express");
const  contacts_Act = require("../controller/contacts");
const router = express.Router();
// router.get('/', contacts_Act.getcontacts);
router.get('/:id', contacts_Act.getAllUserContacts);
router.put('/:user_id/:id', contacts_Act.updateContact);
// router.post('/:id', contacts_Act.createContact1);
router.post('/:id', contacts_Act.newContactUser);
router.delete('/:id/:contact_id', contacts_Act.deletecontact);
module.exports=router;