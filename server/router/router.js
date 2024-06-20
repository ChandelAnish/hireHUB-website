const express = require('express')
const mysql = require('mysql2')
const connectDB = require('../connectionDB/connectionDB')
const { testing, login, signup, otpverification, postjob, getjobs, getsinglejobs, postAvailability, getAvailability, postJobApplication, updateAvailability, deleteAvailability, getSingleJobApplication ,getUserJobApplication} = require('../controllers/controllers')

const router = express.Router();

router.get('/test', testing)



//login
router.post('/login', login)

//sign-up
router.post('/signup', signup)

//otp verification
router.post('/otpverification', otpverification)

//job post & get job
router.route('/post-jobs').post(postjob).get(getjobs)

//post Availability & get Availability
router.route('/post-Availability').post(postAvailability)
router.route('/post-Availability/:user').get(getAvailability)

//update Availability
router.route('/post-Availability/:id').patch(updateAvailability).delete(deleteAvailability)

//get single job
router.route('/post-jobs/:id').get(getsinglejobs)

//post job application
router.route('/job-application').post(postJobApplication)

// get all job applications of a single user
router.route('/job-application/:user').get(getUserJobApplication)

//single job application
router.route('/job-application/:applicant/:jobid').get(getSingleJobApplication)


module.exports = router;