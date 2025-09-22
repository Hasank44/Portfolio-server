const validator = require('validator');

const validate = admin => {
    let error = {};

    // email validation
    if (!admin.email) {
        error.message = 'Please provide Your Email'
    } else if (!validator.isEmail(admin.email)) {
        error.message = 'Please Provide A Valid Email'
    };

    // password validation
    if (!admin.password) {
        error.message = 'Please Provide Your Password'
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
};

module.exports = validate;