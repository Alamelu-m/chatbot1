const nodemailer = require('nodemailer');
let otp = null;

// Function to send OTP via email
function sendOtp(userEmail) {
    otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'your_email@gmail.com', // Your email
            pass: 'your_app_password', // Your App Password
        },
    });

    let mailOptions = {
        from: 'your_email@gmail.com',
        to: userEmail, // Send to user
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`, // Corrected string interpolation
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// Function to validate OTP
function validateOtp(inputOtp) {
    return otp == inputOtp;
}

module.exports = { sendOtp, validateOtp };
