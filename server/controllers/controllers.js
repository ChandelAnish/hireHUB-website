const connectDB = require("../connectionDB/connectionDB")
const { sendmail } = require("../smtp/smtp")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { uploadOnCloudinary, deleteFromCloudinary } = require('../upload/upload')

const testing = (req, res) => {
    res.send('test successfull again')
}


//login

const login = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ login: false, msg: 'enter all credentials' });
        }

        const user = await prisma.userinfo.findUnique({
            where: { username: req.body.username }
        });

        if (!user) {
            return res.status(200).json({ login: false, msg: 'not found' });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ login: false, msg: 'incorrect user credentials' });
        }

        if (user.status === 'Suspended') {
            return res.status(401).json({ login: false, msg: 'account suspended' });
        }

        if (user.status === 'Unverified') {
            return res.status(401).json({ login: false, msg: 'email Unverified &nbsp;<a href="../otpverification/index.html" onclick="emailVerification()">verify now</a>' });
        }

        return res.status(200).json({
            login: true,
            userdetails: { ...user },
            msg: 'login successful'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ login: false, msg: 'internal server error' });
    }
};


//signup
const signup = async (req, res) => {
    const { username, email, password, confirmpassword, usertype } = req.body;

    // Check for all credentials
    if (!username || !email || !password || !confirmpassword || !usertype) {
        return res.status(401).json({ login: false, msg: 'Enter all credentials' });
    }

    // Check for password matches confirm password
    if (password !== confirmpassword) {
        return res.status(401).json({ signup: false, msg: "Password doesn't match" });
    }

    try {
        // Check for already registered email
        const existingEmail = await prisma.userinfo.findUnique({
            where: { email },
        });

        if (existingEmail) {
            return res.status(403).json({ login: false, msg: 'Email already exists' });
        }

        // Check for username already exists
        const existingUsername = await prisma.userinfo.findUnique({
            where: { username },
        });

        if (existingUsername) {
            return res.status(403).json({ signup: false, msg: 'User already exists' });
        }

        // Insert new user
        const newUser = await prisma.userinfo.create({
            data: {
                username,
                email,
                password,
                usertype,
            },
        });

        // Insert to labour info table if user is a labour
        if (usertype === 'labour') {
            const newLabour = await prisma.labourinfo.create({
                data: { username },
            });
        }

        return res.status(200).json({
            signup: true,
            msg: 'Signed up successfully',
            userdetails: { username, email, password, usertype },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ signup: false, msg: 'Internal server error' });
    }
};


//get all users
const getAllUsers = async (req, res) => {
    const allUsers = await prisma.userinfo.findMany({});
    res.status(200).json(allUsers)
}

//get single user
const getSingleUser = async (req, res) => {
    const singleUser = await prisma.userinfo.findUnique({ where: { username: req.params.username } });
    res.status(200).json(singleUser)
}

//otp verification
let otp;
const otpverification = async (req, res) => {
    if (req.body.email) {
        try {
            otp = await sendmail(req.body.email);
            return res.status(200).json({ msg: "OTP sent" });
        } catch (error) {
            return res.status(500).json({ msg: "OTP sent faliure" });
        }
    }
    if (otp !== req.body.userotp) {
        return res.status(200).json({ success: false, msg: "otp not verified" });
    }
    else {
        return res.status(200).json({ success: true, msg: "otp verified" });
    }
}

//post-jobs
const postjob = async (req, res) => {
    const newjob = await prisma.job_post.create({ data: req.body });
    res.status(200).json(newjob)
}

//get-jobs
const getjobs = async (req, res) => {
    const jobs = await prisma.job_post.findMany();
    res.status(200).json(jobs)
}

//get-single-job
const getsinglejobs = async (req, res) => {
    const singlejobs = await prisma.job_post.findUnique({ where: { id: req.params.id } });
    res.status(200).json(singlejobs)
}

//post Availability
const postAvailability = async (req, res) => {
    const availability = await prisma.post_availability.create({ data: req.body });
    res.status(200).json(availability)
}

//get All Availability
const getAllAvailability = async (req, res) => {
    const allAvailability = await prisma.post_availability.findMany();
    res.status(200).json(allAvailability)
}

//get Availability
const getAvailability = async (req, res) => {
    const availability = await prisma.post_availability.findMany({
        where: { user: req.params.user }
    });
    res.status(200).json(availability)
}

//update Availability
const updateAvailability = async (req, res) => {
    const updatedAvailability = await prisma.post_availability.update({
        where: { id: req.params.id },
        data: req.body
    });
    res.status(200).json(updatedAvailability)
}

//delete Availability
const deleteAvailability = async (req, res) => {
    const deleteAvailability = await prisma.post_availability.delete({
        where: { id: req.params.id }
    });
    res.status(200).json(deleteAvailability)
}

//post Application
const postJobApplication = async (req, res) => {
    const data = await prisma.applications.findUnique({
        where: {
            jobid_applicant: {
                jobid: req.body.jobid,
                applicant: req.body.applicant
            }
        }
    });
    if (data) {
        res.status(409).json({ msg: "Job Already Applied", applicationID: data.id })
        return;
    }
    else {
        const application = await prisma.applications.create({ data: req.body });
        res.status(200).json(application)
    }
}

//get all Application of single user
const getUserJobApplication = async (req, res) => {
    try {
        const applications = await prisma.applications.findMany({
            where: { applicant: req.params.user },
            include: { job: true }
        });
        res.status(200).json(applications)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "some error occured" })
    }
}

//get Single Job Application
const getSingleJobApplication = async (req, res) => {
    try {
        const singleApplication = await prisma.applications.findUnique({
            where: {
                jobid_applicant: {
                    jobid: req.params.jobid,
                    applicant: req.params.applicant
                }
            }
        });
        return res.status(200).json(singleApplication)
    } catch (error) {
        console.log(error)
    }
}

//get single labour info
const getLabourInfo = async (req, res) => {
    try {
        const singleLabour = await prisma.labourinfo.findUnique({
            where: { username: req.params.username },
            include: { userinfo: true }
        });
        return res.status(200).json(singleLabour)
    } catch (error) {
        console.log(error)
    }
}

//post profile image
const postProfileImg = async (req, res) => {
    try {
        // console.log(req.file)
        const imgURL = await uploadOnCloudinary(req.file.path)
        // console.log(imgURL)
        const updatedProfileImg = await prisma.userinfo.update({
            where: { username: req.params.username },
            data: { profileImgURL: imgURL }
        });
        // console.log(updatedProfileImg)


        // console.log(req.query)
        const oldProfileURL = req.query.oldImgURL;
        if (oldProfileURL) {
            const imgName = oldProfileURL.split('/')
            const imgname = imgName[imgName.length - 1].split(".")[0]
            // console.log(imgname)
            deleteFromCloudinary(imgname)
        }

        res.status(200).json(updatedProfileImg);
    } catch (error) {
        console.log(error)
    }
}

//update status
const updateStatus = async (req, res) => {
    const updatedStatus = await prisma.userinfo.update({
        where: { username: req.params.username },
        data: req.body
    });
    res.status(200).json(updatedStatus)
}


module.exports = { testing, login, signup, getSingleUser, otpverification, postjob, getjobs, getsinglejobs, postAvailability, getAvailability, postJobApplication, updateAvailability, deleteAvailability, getSingleJobApplication, getUserJobApplication, getAllAvailability, getLabourInfo, postProfileImg, getAllUsers, updateStatus };