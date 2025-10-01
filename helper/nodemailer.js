const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, html) => {
    // Tạo transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,      // Gmail của bạn
            pass: process.env.EMAIL_PASSWORD,   // App Password đã tạo
        },
    });

    // Nội dung email
    const mailOptions = {
        from: process.env.EMAIL_USER, // người gửi
        to: email,                      // người nhận
        subject: subject,                           // tiêu đề                           // nội dung dạng text
        html: html                     // nội dung dạng HTML
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
        console.log("Message sent: %s", info.messageId);
    });
        
}

