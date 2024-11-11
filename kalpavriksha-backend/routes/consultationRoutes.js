const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('consultationType').notEmpty().withMessage('Consultation type is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, institution, consultationType, message } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO consultations (name, email, phone, institution, consultation_type, message) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, institution, consultationType, message]
        );

        res.status(201).json({ 
            message: 'Consultation request submitted successfully',
            consultationId: result.insertId 
        });
    } catch (error) {
        console.error('Consultation form error:', error);
        res.status(500).json({ error: 'Error submitting consultation request' });
    }
});

module.exports = router;