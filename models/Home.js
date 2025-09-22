const { Schema, model } = require('mongoose');

const homeSchema = new Schema({
    bgImage:{
        type: String,
        trim: true
    },
    profileImage:{
        type:String,
        trim: true
    },
    name:{
        type:String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    bio:{
        type: String,
        trim: true
    },
    messageLink: {
        type: String,
        trim: true
    }
},{
    timestamps: true
});

const Home = model('Home', homeSchema);
module.exports = Home;