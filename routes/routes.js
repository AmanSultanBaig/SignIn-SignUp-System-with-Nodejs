const express = require('express');
const router = express.Router();

const SignUpRoutes = require('../controllers/SignUp.Controller')

router.post('/api/signUp', SignUpRoutes.SignUp)

module.exports = router;