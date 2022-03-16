let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const userModel = require("../models/models");
const userServices = require('../services/User.service')

async function register(req, res, next){
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
        userServices.register(req.body).then(
            res.json("utilisateur créer 😎")
        ).catch(err => next(err))
}

async function login(req, res, next) {
    const {username, password} = req.body;
    userServices.login({username, password}).then(
        user => {
            user ? res.json(user): res.json({error: 'Username ou password est incorrect'});

        }).catch(err => next(err))
    }


module.exports = {
    register,
    login
   };