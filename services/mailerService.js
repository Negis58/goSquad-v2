const nodemailer = require('nodemailer');
const config = require('config');
const mailerEmail = config.get('mailerEmail');

exports.sendEmail = async function (email, subject, text)  {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: mailerEmail,
            pass: config.get('mailerPassword')
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