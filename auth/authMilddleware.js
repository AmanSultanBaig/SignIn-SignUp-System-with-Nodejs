const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = mongoose.model('SignUp')
require('dotenv').config({ path: '../config/.env' })

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            status: "failed",
            message: "Login Please"
        })
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                status: "failed",
                message: "Login Plase"
            })
        }

        const { _id } = payload;
        User.findById(_id).then(data => {
            req.user = data
        })
        next()
    })
}