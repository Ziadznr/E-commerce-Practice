const nodemailer = require('nodemailer');

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rakib18@cse.pstu.ac.bd", // your Gmail
            pass: "dczw msgy scgt rzpe" // paste new password here
        }
    });

    let mailOption = {
        from: "E-commerce Website <rakib18@cse.pstu.ac.bd>",
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transport.sendMail(mailOption);
};

module.exports = EmailSend;
