const validator = require('validator');

const validate = admin => {
    let error = {};

    //name validation
    if (!admin.name) {
        error.message = 'Please Provide Your Name'
    } else if ( admin.name.length > 20) {
        error.message = 'Name Must Be Under 20 Characters'
    }

    // email validation
    if (!admin.email) {
        error.message = 'Please provide Your Email'
    } else if (!validator.isEmail(admin.email)) {
        error.message = 'Please Provide A Valid Email'
    };

    // password validation
    if (!admin.password) {
        error.message = 'Please Provide Your Password'
    } else if ( admin.password.length < 8) {
        error.message = 'Password Must At Latest 8 Characters'
    }

    // confirmPassword validation
    if (!admin.confirmPassword) {
        error.message = 'Please Provide Your Confirm Password'
    } else if ( admin.password !== admin.confirmPassword) {
        error.message = 'Password Don\'t Match'
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
};

module.exports = validate;