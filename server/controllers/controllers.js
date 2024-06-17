const connectDB = require("../connectionDB/connectionDB")
const { sendmail } = require("../smtp/smtp")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const testing = (req, res) => {
    res.send('test successfull again')
}


//login

const login = (req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        return res.status(401).json({ login: false, msg: 'enter all credentials' })
    }
    connectDB.query('select * from hirehub_db.userinfo where username=?', [req.body.username], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (row.length < 1) {
                return res.status(200).json({ login: false, msg: 'not found' })
            }
            else {
                connectDB.query('select * from hirehub_db.userinfo where username=?', [req.body.username], (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (row[0].password == req.body.password) {
                            // res.sendFile(path.resolve(__dirname,'./public/main-page/index1.html'))
                            return res.status(200).json({
                                login: true,
                                userdetails: { ...row[0] },
                                msg: 'login successful'
                            })
                            // return res.status(200).redirect('./main-page/index1.html')
                        }
                        else {
                            return res.status(401).json({ login: false, msg: 'incorrect user credentials' })
                        }
                    }
                })
            }
        }
    })
}

//signup
const signup = (req, res) => {
    // console.log(req.body)
    const { username, email, password, confirmpassword, usertype } = req.body;
    //check for all credintials
    if (!username || !email || !password || !confirmpassword || !usertype) {
        return res.status(401).json({ login: false, msg: 'enter all credentials' })
    }


    //check for password matches confirm password
    if (password != confirmpassword) {
        return res.status(401).json({ signup: false, msg: "password doesn't matched" })
    }


    //check for already registered email
    connectDB.query('select * from hirehub_db.userinfo where email=?', [email], (err, row) => {
        if (err) {
            console.log(err);
        }
        else if (row.length > 0) {
            flag = true;
            return res.status(403).json({ login: false, msg: 'email already exists' })
        }


        //check for username already exists
        connectDB.query('select * from hirehub_db.userinfo where username=?', [username], (err, row) => {
            if (err) {
                console.log(err);
            }
            else {
                if (row.length > 0) {
                    // console.log(row[0].username)
                    return res.status(403).json({ signup: false, msg: 'user already exists' })
                }
                else {
                    connectDB.query('insert into userinfo values(?,?,?,?)', [username, email, password, usertype], (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(row);
                            return res.status(200).json({
                                signup: true, msg: "signed up successfully",
                                userdetails: { username, email, password, usertype }
                            })
                        }
                    })
                }
            }
        })
    })
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

// const postjob = async (req, res) => {
//     const { joblogo, jobtitle, jobtype, tasks, company, salary, location, skills, jobdescription, state, user } = req.body;

//     try {
//         const newjob = await prisma.job_post.create({
//             data: {
//                 joblogo: joblogo,
//                 jobtitle: jobtitle,
//                 jobtype: jobtype,
//                 tasks:tasks,
//                 company: company,
//                 salary: salary,
//                 location: location,
//                 skills: skills,
//                 jobdescription: jobdescription,
//                 state: state,
//                 user: user
//             }
//         });

//         res.status(201).json(newjob);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


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

//get Availability
const getAvailability = async (req, res) => {
    const availability = await prisma.post_availability.findMany({
        where: { user: req.params.user}
    });
    res.status(200).json(availability)
}

module.exports = { testing, login, signup, otpverification, postjob, getjobs, getsinglejobs, postAvailability ,getAvailability};