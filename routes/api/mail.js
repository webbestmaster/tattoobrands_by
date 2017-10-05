const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'web.best.master@gmail.com',
        pass: ''
    }
}));

function sendEmailStatus(req, res) {
    const mailOptions = {
        from: 'web.best.master@gmail.com',
        to: 'dmitry.turovtsov@gmail.com', // eslint-disable-line id-length
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.sendEmailStatus = sendEmailStatus;
