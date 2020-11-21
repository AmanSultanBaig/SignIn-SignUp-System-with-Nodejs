const SignUpSchema = require('../models/SignUp.model')

// sign up controller logic
exports.SignUp = (req, res) => {
    let SignUpDetails = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    SignUpSchema.findOne({ Email: SignUpDetails.Email }).then(emailExist => {       // user already exists
        if (emailExist) {
            res.status(401).json({
                status: "failed",
                message: "Email Already Exists"
            })
        } else {
            new SignUpSchema(SignUpDetails).save()
                .then(signUp => {
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
    }).catch(e => {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    })
}