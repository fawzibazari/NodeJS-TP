let bcrypt = require('bcryptjs');
const userModel = require("../models/models");

const auth = require('../utils/jwt')

async function register(params){
    const user = new userModel(params)
    await user.save();
}

async function login ({username, password}) {
    const user = await userModel.findOne({username})
    //check le mdp et le username
    if(user && bcrypt.compareSync(password, user.password)){
        const token = auth.generateToken(username)
        return {...user.toJSON(), token}
    }
}

async function getById(id) {
    const user = await userModel.findById(id);
    console.log(user);
    return user.toJSON()
}
module.exports = {
    register,
    login,
    getById
};