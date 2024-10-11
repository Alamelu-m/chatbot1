const express = require('express');
const { sendOtp, validateOtp } = require('./otpservice'); // Adjust the path as necessary
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to request OTP
app.post('/request-otp', (req, res) => {
    const email = req.body.email; // Get email from the request body
    sendOtp(email); // Send OTP to the specified email
    res.status(200).send('OTP sent to ' + email);
});

// Route to validate OTP
app.post('/validate-otp', (req, res) => {
    const inputOtp = req.body.otp; // Get input OTP from the request body
    if (validateOtp(inputOtp)) {
        res.status(200).send('OTP validated successfully.');
    } else {
        res.status(400).send('Invalid OTP.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
