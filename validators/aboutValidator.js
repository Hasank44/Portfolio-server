
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

    // description validation
    if (!user.description) {
        error.message = 'Please Provide Your Description';
    } else if (user.description.length < 30) {
        error.message = 'Description Must Be At Latest 30 Characters';
    }

    //image validation 
    if (!user.image) {
        error.message = 'Please Provide Your Image Link'
    }

    //cv validation 
    if (!user.cvLink) {
        error.message = 'Please Provide Your Image cvLink'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    };
};

module.exports = validate;