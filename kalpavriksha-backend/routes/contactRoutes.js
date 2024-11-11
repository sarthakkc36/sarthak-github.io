const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { sendEmail } = require('../config/emailConfig');
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('subject').notEmpty().withMessage('Subject is required'),
    check('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, subject, message } = req.body;
        
        // Save to database
        const [result] = await db.query(
            'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, subject, message]
        );

        // Send email notification
        const emailHTML = `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3>Message:</h3>
            <p>${message}</p>
            <hr>
            <p>This message was sent from the Kalpavriksha website contact form.</p>
        `;

        await sendEmail('New Contact Form Submission', emailHTML);

        res.status(201).json({ 
            message: 'Contact form submitted successfully',
            contactId: result.insertId 
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Error submitting contact form' });
    }
});

module.exports = router;