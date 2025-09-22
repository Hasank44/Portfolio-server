const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Admin = model('Admin', adminSchema);
module.exports = Admin;