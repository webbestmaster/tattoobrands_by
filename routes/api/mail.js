/* global process */
const {env} = process;
const {ORDER_EMAIL, ORDER_PASS} = env;
const {getOrderBy} = require('./../views/helper/order');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: ORDER_EMAIL,
        pass: ORDER_PASS
    }
}));


function sendEmailStatus(slug) {
    return new Promise((resolve, reject) => {
        return getOrderBy({slug})
            .then(order => {
                const mailOptions = {
                    from: ORDER_EMAIL,
                    to: order.user.email, // eslint-disable-line id-length
                    subject: 'Статус вашего заказа изменён!',
                    text: 'That was easy2'
                };

                transporter
                    .sendMail(mailOptions, (err, info) => err ? reject(err) : resolve(info));
            })
            .catch(reject);
    });
}

module.exports.sendEmailStatus = sendEmailStatus;
