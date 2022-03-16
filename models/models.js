const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contacts: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contacts',
    }
],
  });
  UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})
  const User = mongoose.model("User", UserSchema);
  module.exports = User;