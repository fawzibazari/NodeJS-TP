const express = require("express");
const  contacts_Act = require("../controller/contacts");
const router = express.Router();
// router.get('/', contacts_Act.getcontacts);
router.get('/:id', contacts_Act.getAllUserContacts);
// router.post('/', contacts_Act.createcontact);
// router.post('/:id', contacts_Act.createContact1);
router.post('/:id', contacts_Act.newContactUser);
module.exports=router;