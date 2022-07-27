const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Nodemailer working.");
    }
});

const sendVerificationEmail = (firstName, email) => {
    var mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your MarkyMark Account!",
        text: `Hey ${firstName},
        \nThank you for registering for MarkyMark. To start using the application we worked so hard to bring you, please verify your email address by clicking the URL below:
        \nhttp://localhost:5001/api/verification?email=${email}
        \nWelcome to MarkyMark,
        \nThe MarkyMark Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
};

const sendResetEmail = (email, userId, token, type) => {
    var mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Reset Your MarkyMark Password!",
        text: `Hey MarkyMark User,
        \nSomebody requested a ${type} reset for the account attached to this email, if you didn't do this then you can ignore this email and the URL will expire in 24 hours, otherwise click the URL below to complete the process:
        \nhttp://localhost:3000/reset?userId=${userId}&token=${token}&type=${type}
        \nThanks for using MarkyMark,
        \nThe MarkyMark Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
};
module.exports = { sendVerificationEmail, sendResetEmail };
