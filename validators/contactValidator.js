const validator = require('validator');
const validate = user => {
    let error = {};

    // name validation
    if (!user.name) {
        error.message = 'Please Provide Your Name';
    } else if (user.name.length > 20) {
        error.message = 'Name Must Be At Latest Under 20 Characters';
    }

    // email validation
    if (!user.email) {
        error.message = 'Please Provide Your Email';
    } else if (!validator.isEmail(user.email)) {
        error.message = 'Please Provide A Valid Email';
    }

    // subject validation
    if (!user.subject) {
        error.message = 'Please Provide Your subject';
    } else if (user.subject.length > 50) {
        error.message = 'Subject Must Be At Latest Under 50 Characters';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;