const connectDB = require("../connectionDB/connectionDB")
const { sendmail } = require("../smtp/smtp")

const testing = (req, res) => {
    res.send('test successfull again')
}


//login

const login = (req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        return res.status(401).json({ login: false, msg: 'enter all credentials' })
    }
    connectDB.query('select * from userdetails.userinfo where username=?', [req.body.username], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (row.length < 1) {
                return res.status(200).json({ login: false, msg: 'not found' })
            }
            else {
                connectDB.query('select * from userdetails.userinfo where username=?', [req.body.username], (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (row[0].password == req.body.password) {
                            // res.sendFile(path.resolve(__dirname,'./public/main-page/index1.html'))
                            return res.status(200).json({ 
                                login: true, 
                                userdetails:{...row[0]}, 
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
    connectDB.query('select * from userdetails.userinfo where email=?', [email], (err, row) => {
        if (err) {
            console.log(err);
        }
        else if (row.length > 0) {
            flag = true;
            return res.status(403).json({ login: false, msg: 'email already exists' })
        }


        //check for username already exists
        connectDB.query('select * from userdetails.userinfo where username=?', [username], (err, row) => {
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

let otp;
const otpverification = async(req, res) => {
    if (req.body.email) {
        try {
            otp=await sendmail(req.body.email);
            return res.status(200).json({ msg: "OTP sent" });
        } catch (error) {
            return res.status(500).json({ msg: "OTP sent faliure" });
        }
    }
    if (otp !== req.body.userotp) {
        return res.status(200).json({ success:false, msg: "otp not verified" });
    }
    else {
        return res.status(200).json({ success:true, msg: "otp verified" });
    }
}

module.exports = { testing, login, signup, otpverification };