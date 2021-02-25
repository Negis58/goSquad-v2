const nodemailer = require('nodemailer');
const config = require('config');
const mailerEmail = process.env.MAILER_EMAIL;

exports.sendEmail = async function (email, subject, text)  {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: mailerEmail,
            pass: process.env.MAILER_PASSWORD
        }
    }); 

    let mailOptions = {
        to: email,
        from: mailerEmail,
        subject: subject,
        text: text
    };
        let result = await transporter.sendMail(mailOptions,(err,info) =>{
            if (err) return console.log(err)
            console.log('info', info)
        });
    return result;
};