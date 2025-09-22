
const validate = user => {
    let error = {};

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    };

    // name validation
    if (!user.icon) {
        error.message = 'Please Provide Your Icon Link';
    };

    // type validation
    if (!user.type) {
        error.message = 'Please Provide Your type';
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;