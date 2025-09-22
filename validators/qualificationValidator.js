
const validate = user => {
    let error = {};

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    } else if (user.title.length > 15) {
        error.message = 'Title Must Be At Latest Under 15 Characters';
    } else if (user.title.length < 5) {
        error.message = 'Title Must Be At Latest 8 Characters';
    };

    // place validation
    if (!user.place) {
        error.message = 'Please Provide Your Place';
    } else if (user.place.length < 5) {
        error.message = 'Place Must Be At Latest 8 Characters';
    };

    // description validation
    if (!user.description) {
        error.message = 'Please Provide Your Description';
    } else if (user.description.length < 50) {
        error.message = 'Description Must Be At Latest 50 Characters';
    };

    // image validation
    if (!user.image) {
        error.message = 'Please Provide Your Image'
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;