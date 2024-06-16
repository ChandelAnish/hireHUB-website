const express = require('express')
const mysql = require('mysql2')
const connectDB = require('../connectionDB/connectionDB')
const { testing, login, signup, otpverification,postjob,getjobs,getsinglejobs,postAvailability} = require('../controllers/controllers')

const router = express.Router();

router.get('/test', testing)



//login
router.post('/login', login)

//sign-up
router.post('/signup', signup)

//otp verification
router.post('/otpverification',otpverification )

//job post & get job
router.route('/post-jobs').post(postjob).get(getjobs)

//post Availability & get Availability
router.route('/post-Availability').post(postAvailability)
// .get(getAvailability)

//get single job
router.route('/post-jobs/:id').get(getsinglejobs)


module.exports = router;