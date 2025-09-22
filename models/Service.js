const { Schema, model } = require('mongoose');
const serviceSchema = new Schema({
    icon: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }
},{
    timestamps: true
})
const Service = model('Service', serviceSchema);
module.exports = Service;