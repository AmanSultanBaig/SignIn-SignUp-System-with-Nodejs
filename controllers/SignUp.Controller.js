const SignUpSchema = require('../models/SignUp.model')
const bcrypt = require('bcrypt')

let saltRounds = 10;
// sign up controller logic
exports.SignUp = (req, res) => {
    let SignUpDetails = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    SignUpSchema.findOne({ Email: req.body.Email }).then(emailExist => {       // user already exists
        if (emailExist) {
            res.status(401).json({
                status: "failed",
                message: "Email Already Exists"
            })
        } else {
            bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
                if (err) {
                    res.status(404).json({
                        status: "failed",
                        message: "Password won't able to Hash"
                    })
                }
                else {
                    new SignUpSchema({
                        Name: req.body.Name,
                        Email: req.body.Email,
                        Password: hash,
                    }).save()
                        .then(signUp => {
                            // Store hash in your password DB.
                            res.status(200).json({
                                status: "success",
                                message: "SignUp Successfully!",
                                RegistrationDetails: signUp
                            })
                        })
                        .catch(err => {
                            res.status(404).json({
                                status: "failed",
                                message: err.message
                            })
                        })
                }
            })
        }
    }).catch(e => {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    })
}