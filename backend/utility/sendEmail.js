const nodemailer = require('nodemailer');

const sendEmail = async (to, { subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })
    await transporter.sendMail({
        from: "Instagram Clone",
        to: to,
        subject: subject,
        html: html
    })
}

module.exports = sendEmail;
