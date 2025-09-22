
const validate = user => {
    let error = {};

    // image validation
    if (!user.image) {
        error.message = 'Please Provide Your Image';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;