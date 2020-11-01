const mongoose = require('mongoose');

const SignUpSchema = mongoose.Schema({
    Name: {
        type: String,
        required:true
    },
    Email: {
        type: String,
        required:true,
        unique: true
    },
    Password: {
        type: String,
        required:true,
    },
})

module.exports = mongoose.model('SignUp', SignUpSchema, 'SignUpCollection')