
const validate = user => {
    let error = {};

    // image validation
    if (!user.image) {
        error.message = 'Please Provide Your Image';
    }
    if (!user.name) {
        error.message = 'Please Provide Your Name';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;