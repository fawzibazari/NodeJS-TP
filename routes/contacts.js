const express = require("express");
const  contacts_Act = require("../controllers/contacts");
const router = express.Router();
router.get('/', contacts_Act.getcontacts);
// router.get('/:roll', contacts_Act.getspeccontacts);
router.post('/', contacts_Act.createcontact);
// router.patch('/:roll', student_Act.updatestudent);
// router.delete('/:roll', student_Act.deletestudent);
module.exports=router;