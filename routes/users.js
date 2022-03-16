var express = require('express');
var router = express.Router();
const userModel = require("../models/models");


/* GET users listing. */
router.get('/',async function(request, response) {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


// Create a new user
router.post("/add_user", async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
