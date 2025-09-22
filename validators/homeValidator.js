
const validate = user => {
    let error = {};

    // name validation
    if (!user.name) {
        error.message = 'Please Provide Your Name';
    } else if (user.name.length > 20) {
        error.message = 'Name Must Be At Latest Under 20 Characters';
    } else if (user.name.length < 8) {
        error.message = 'Name Must Be At Latest 8 Characters';
    };

    // title validation
    if (!user.title) {
        error.message = 'Please Provide Your Title';
    } else if (user.title.length > 40) {
        error.message = 'Title Must Be At Latest Under 40 Characters';
    } else if (user.title.length < 8) {
        error.message = 'Title Must Be At Latest 8 Characters';
    };

    // bio validation
    if (!user.bio) {
        error.message = 'Please Provide Your bio';
    } else if (user.bio.length > 30) {
        error.message = 'Bio Must Be At Latest Under 30 Characters';
    } else if (user.bio.length < 8) {
        error.message = 'Bio Must Be At Latest 8 Characters';
    };

    // image validator
    if (!user.bgImage) {
        error.message = 'Please Provide Your Background Image'
    };

    // profileImage validator
    if (!user.profileImage) {
        error.message = 'Please Provide Your Profile Image'
    };
    
    // messageLink validator
    if (!user.messageLink) {
        error.message = 'Please Provide Your Message Link'
    };

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;