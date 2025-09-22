const { Schema, model } = require('mongoose');

const contactLocationSchema = new Schema({
    icon: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
});

const ContactLocation = model("ContactLocation", contactLocationSchema);
module.exports = ContactLocation;
