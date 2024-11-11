// File: server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
async function testConnection() {
    try {
        await db.query('SELECT 1');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/consultation', consultationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add this to your server.js
const { sendEmail } = require('./config/emailConfig');

// Test email route
app.get('/test-email', async (req, res) => {
    try {
        const testHTML = `
            <h1>Test Email</h1>
            <p>This is a test email from your Kalpavriksha website.</p>
            <p>If you receive this, your email configuration is working!</p>
        `;
        
        const result = await sendEmail('Test Email from Kalpavriksha', testHTML);
        
        if (result) {
            res.json({ message: 'Test email sent successfully!' });
        } else {
            res.status(500).json({ error: 'Failed to send test email' });
        }
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({ error: `Failed to send test email: ${error.message}` });
    }
});