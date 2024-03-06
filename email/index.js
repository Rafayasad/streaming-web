var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL_CONFIG_USER, pass: process.env.EMAIL_CONFIG_APP_PASS },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: 'mmcgbl@gmail.com',
    to: '',
    subject: '',
    text: ''
};

module.exports = {
    sendOTP: (to, subject, body) => {
        return new Promise((reslove, reject) => {
            mailOptions.to = to
            mailOptions.subject = subject
            mailOptions.text = body
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    reslove('Email sent: ' + info.response);
                }
            })
        })
    }
}