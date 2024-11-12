const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { sendEmail } = require('../config/emailConfig');
const { check, validationResult } = require('express-validator');

router.post('/register', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('program').notEmpty().withMessage('Program is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, address, program, message } = req.body;
        
        // Save to database
        const [result] = await db.query(
            'INSERT INTO training_registrations (name, email, phone, address, program, message) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, address, program, message]
        );

        // Send email notification
        const emailHTML = `
            <h2>New Training Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Program:</strong> ${program}</p>
            <h3>Additional Message:</h3>
            <p>${message || 'No additional message'}</p>
            <hr>
            <p>This registration was submitted from the Kalpavriksha website.</p>
        `;

        await sendEmail('New Training Registration', emailHTML);

        res.status(201).json({ 
            message: 'Registration submitted successfully',
            registrationId: result.insertId 
        });
    } catch (error) {
        console.error('Training registration error:', error);
        res.status(500).json({ error: 'Error submitting registration' });
    }
});

module.exports = router;