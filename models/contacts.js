const mongoose =require('mongoose');
const contactsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    firstname:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    number:  {
        type: Number,
        required: true,
    },
    registered_on: {
        type: Date,
        default: new Date(),
    },
    user:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
})
var contacts=mongoose.model('contacts',contactsSchema);
module.exports= contacts;