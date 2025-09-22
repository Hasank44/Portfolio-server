const { Schema, model } = require('mongoose');

const socialSchema = new Schema({
    icon: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
});

const ContactSocial = model('ContactSocial', socialSchema);
module.exports = ContactSocial;