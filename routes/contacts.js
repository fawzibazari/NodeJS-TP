const express = require("express");
const  contacts_Act = require("../controller/contacts");
const router = express.Router();
router.get('/', contacts_Act.getcontacts);
router.post('/', contacts_Act.createcontact);
module.exports=router;