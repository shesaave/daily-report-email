const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require("nodemailer");

(async function run (){
    console.log('Running my daily report...')

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER_EMAIL,
            pass: process.env.EMAIL_USER_PASS


        },
    });

       await transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        to: process.env.EMAIL_TO, // list of receivers
        subject: "Daily Report 📚", // Subject line
        text: `
        
        Daily Report 📚
        `, // plain text body
        html: `<h1>Daily Report 📚</h1>`, // html body
    });



})();