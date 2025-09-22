
const validate = user => {
    let error = {};

    // icon validation
    if (!user.icon) {
        error.message = 'Please Provide Your Icon'
    };

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    };

    // description validation
    if (!user.description) {
        error.message = 'Please Provide Your Description';
    } else if (user.description.length < 30) {
        error.message = 'Description Must Be At Latest 30 Characters';
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;