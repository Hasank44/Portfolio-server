const validator = require('validator');
const validate = user => {
    let error = {};

    // icon validation
    if (!user.icon) {
        error.message = 'Please Provide Your Icon Link';
    }

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    } else if ( user.title.length > 15) {
        error.message = 'Title Must Be At Latest 15 Characters';
    }

    // link validation
    if (!user.link) {
        error.message = 'Please Provide Your Link';
    } else if (user.link.length > 50) {
        error.message = 'link Must Be At Latest Under 50 Characters';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;