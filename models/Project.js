const { Schema, model } = require('mongoose');
const projectSchema = new Schema({
    title:{
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    github:{
        type: String,
        trim: true
    },
    link:{
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    isEnable: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
const Project = model('Project', projectSchema);
module.exports = Project;