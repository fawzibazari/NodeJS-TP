const express = require("express");
const  contacts_Act = require("../controllers/contacts");
const router = express.Router();
router.get('/', contacts_Act.getcontacts);
// router.get('/:roll', contacts_Act.getspeccontacts);
router.post('/', contacts_Act.createcontact);
router.put('/:id', contacts_Act.updatecontact);
router.delete('/:id', contacts_Act.deletecontact);
module.exports=router;