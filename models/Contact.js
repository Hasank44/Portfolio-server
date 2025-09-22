const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Contact = model('Contact', contactSchema);
module.exports = Contact;