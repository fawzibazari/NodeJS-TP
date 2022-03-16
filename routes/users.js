var express = require('express');
const {register, login,findById} = require('../controller/LoginController')
var router = express.Router();
const userModel = require("../models/models");

/* GET users listing. */
router.get('/', async function(request, response) {
  const users = await userModel.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Create a new user
router.post("/register", register );
router.post("/login", login );
router.get("/:id", findById );

module.exports = router;
