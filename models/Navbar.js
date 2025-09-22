const { Schema, model } = require('mongoose');

const navbarSchema = new Schema({
    image:{
        type: String,
    }
},{
    timestamps: true
});
const Navbar = model('Navbar', navbarSchema);
module.exports = Navbar;