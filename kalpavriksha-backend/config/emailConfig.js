// File: config/emailConfig.js
const nodemailer = require('nodemailer');

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    },
    debug: true, // Enable debug logging
    logger: true  // Enable logger
});

// Function to send email
const sendEmail = async (subject, htmlContent) => {
    // Log configuration
    console.log('Email Configuration:');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', process.env.EMAIL_RECIPIENT);
    
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT,
            subject: subject,
            html: htmlContent
        };

        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Response:', info.response);
        return true;
    } catch (error) {
        console.error('Detailed email error:', error);
        if (error.code === 'EAUTH') {
            console.error('Authentication failed. Check your email and app password.');
        }
        return false;
    }
};

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

module.exports = { sendEmail };