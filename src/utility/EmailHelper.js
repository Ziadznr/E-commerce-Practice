const nodemailer = require('nodemailer');

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ziadznr311@gmail.com", // your Gmail
            pass: "lomg lwty qepp qxkd" // paste new password here
        }
    });

    let mailOption = {
        from: "MERN Ecommerce Site <ziadznr311@gmail.com>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transport.sendMail(mailOption);
};

module.exports = EmailSend;
