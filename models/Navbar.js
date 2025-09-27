const { Schema, model } = require('mongoose');

const navbarSchema = new Schema({
    image:{
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    }
},{
    timestamps: true
});
const Navbar = model('Navbar', navbarSchema);
module.exports = Navbar;