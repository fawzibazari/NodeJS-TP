const User = require('../models/studentdata')
const getStudents = async (req, res) => {
    try {
        const student= await User.find();
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getspecStudent = async (req,res) => {
    const roll = req.params.roll;
try {
        const stud = await Student.findOne({roll: roll});
res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}


const createstudent =  async (req, res) => {
    console.log(req.body);
    const newstudent = new User({
        name:req.body.name,
        roll:req.body.roll,
        registration:req.body.registration,
        subjects:req.body.subjects,
        created_on:req.body.created_on
})
    try {
        await newstudent.save();
res.status(201).json(newstudent);
} catch(error) {
        res.status(400).json({ message : error.message});
    }
}

module.exports = {
    getStudents,
    createstudent
}