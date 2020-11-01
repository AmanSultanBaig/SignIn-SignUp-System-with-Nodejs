const SignUpSchema = require('../models/SignUp.model')

exports.SignUp = (req, res) => {
    new SignUpSchema({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }).save()
        .then(signUp => {
            res.status(200).json({
                message: "SignUp Successfully!",
                SignUpDetails: signUp
            })
        })
        .catch(err => {
            if (err) {
                res.status(404).json({
                    message: err.message
                })
            }
        })
}