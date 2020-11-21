const SignUpSchema = require('../models/SignUp.model')
const bcrypt = require('bcrypt')

let saltRounds = 10;
// sign up logic
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
            // Store hash in your password DB.
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
                            res.status(200).json({
                                status: "success",
                                message: "SignUp Successfully!",
                                data: signUp
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

// login logic
exports.login = (req, res) => {
    SignUpSchema.findOne({ Email: req.body.Email }).then(login => {
        if(login) {
            // compare hashed password 
            bcrypt.compare(req.body.Password, login.Password).then(passwordMatched => {
                if(passwordMatched){
                    res.status(200).json({
                        status: "success",
                        message: "Login Successfully!",
                        data: login
                    })
                }else {
                    res.status(400).json({
                        status: "failed",
                        message: "Invalid Password",
                    })
                }
            })
        }
    }).catch(err => {
        res.status(400).json({
            status: "failed",
            message: err.message,
        })
    })
}