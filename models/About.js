const { Schema, model } = require('mongoose');

const aboutSchema = new Schema({
    name:{
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    cvLink: {
        type: String,
        trim: true
    }
    
},{
    timestamps: true
});
const About = model('About', aboutSchema);
module.exports = About;