
const validate = user => {
    let error = {};

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    } else if (user.title.length > 50) {
        error.message = 'Title Must Be At Latest Under 50 Characters';
    } else if (user.title.length < 8) {
        error.message = 'Title Must Be At Latest 8 Characters';
    };

    // description validation
    if (!user.description) {
        error.message = 'Please Provide Your Description';
    } else if (user.description.length > 150) {
        error.message = 'Description Must Be At Latest Under 30 Characters';
    } else if (user.description.length < 8) {
        error.message = 'Description Must Be At Latest 8 Characters';
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;