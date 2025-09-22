
const validate = user => {
    let error = {};

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    } else if (user.title.length > 50) {
        error.message = 'Title Must Be At Latest Under 40 Characters';
    } else if (user.title.length < 8) {
        error.message = 'Title Must Be At Latest 8 Characters';
    };

    // description validation
    if (!user.description) {
        error.message = 'Please Provide Your Description';
    } else if (user.description.length > 300) {
        error.message = 'Description Must Be At Latest Under 200 Characters';
    } else if (user.description.length < 50) {
        error.message = 'Description Must Be At Latest 50 Characters';
    };

    // github
    if (!user.github) {
        error.message = 'Please Provide Your Github Repository Link'
    }

    // project
    if (!user.link) {
        error.message = 'Please Provide Your Github Project Link'
    }

    // image
    if (!user.image) {
        error.message = 'Please Provide Your Project Image Link'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;