const SignUpSchema = require('../models/SignUp.model')

exports.SignUp = (req, res) => {
    let SignUpDetails = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    new SignUpSchema(SignUpDetails).save()
        .then(signUp => {
            res.status(200).json({
                message: "SignUp Successfully!",
                RegistrationDetails: signUp
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