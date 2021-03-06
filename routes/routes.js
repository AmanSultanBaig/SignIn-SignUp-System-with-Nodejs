const express = require('express');
const router = express.Router();

const SignUpRoutes = require('../controllers/SignUp.Controller')
// authorization middleware
const authorization = require('../auth/authMilddleware')

router.post('/api/signUp', SignUpRoutes.SignUp)
router.post('/api/login', SignUpRoutes.login)

module.exports = router;