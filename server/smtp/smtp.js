const express = require('express')
const app = express();
const path = require('path');
const nodemailer = require('nodemailer')
app.use(express.json());


//generating OTP
function generateOTP() {
    return Math.floor(10000 + Math.random() * 90000).toString().slice(1);
}


const sendmail = async (useremail) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.PASS
        }
    });

    let otp = generateOTP();
    // console.log('generated otp inside sendmail : ',otp)

    let mailoptions = {
        from: 'hashira.coder@gmail.com',
        to: useremail,
        subject: 'OTP for hireHUB web App sign-up :',
        text: `your OTP is ${otp} \n please don't share this code with any one`
    };


    try {
        await transporter.sendMail(mailoptions);
        console.log("email sent ");
        return otp;
    }
    catch (error) {
        console.log("email send failure\n", error)
        throw error;
    }

}

module.exports = { sendmail };
