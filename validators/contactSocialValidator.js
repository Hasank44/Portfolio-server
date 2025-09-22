const validator = require('validator');
const validate = user => {
    let error = {};

    // icon validation
    if (!user.icon) {
        error.message = 'Please Provide Your Icon Link';
    }

    // link validation
    if (!user.link) {
        error.message = 'Please Provide Your Link';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;