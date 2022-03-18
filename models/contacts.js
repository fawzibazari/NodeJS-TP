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
        type: String,
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

contactsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
var contacts=mongoose.model('contacts',contactsSchema);
module.exports= contacts;