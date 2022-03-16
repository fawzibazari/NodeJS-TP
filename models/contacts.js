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
})
var contacts=mongoose.model('contacts',contactsSchema);
module.exports= contacts;