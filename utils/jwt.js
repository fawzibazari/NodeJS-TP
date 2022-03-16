const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()

function AuthToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateToken (username){
    return jwt.sign({data: username}, process.env.SECRET_TOKEN, {expiresIn: "2h"});
}

module.exports = {
    AuthToken,
    generateToken
}