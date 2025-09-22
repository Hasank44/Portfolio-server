const { Schema, model } = require('mongoose');

const qualificationSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    place: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Qualification = model('Qualification', qualificationSchema);
module.exports = Qualification;