const express = require('express')
const mysql = require('mysql2')
const connectDB = require('../connectionDB/connectionDB')
const { testing, login, signup, otpverification} = require('../controllers/controllers')

const router = express.Router();

router.get('/test', testing)



//login
router.post('/login', login)

//sign-up
router.post('/signup', signup)

//otp verification
router.post('/otpverification',otpverification )


module.exports = router;