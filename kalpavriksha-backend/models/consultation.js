const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    institution: String,
    consultationType: {
        type: String,
        required: true
    },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consultation', consultationSchema);