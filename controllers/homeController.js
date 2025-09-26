const Home = require('../models/Home');
const homeValidator = require('../validators/homeValidator');
const { default: mongoose } = require('mongoose');

exports.homeGetController = async ( req, res ) => {
    try {
        const home = await Home.find({});
        if (!home) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        if (home.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Home Retrieved Successfully',
            result: home
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.homePostController = async ( req, res ) => {
    try {
        const { bgImage, profileImage, name, title, bio, messageLink } = req.body;
        const validate = homeValidator({ bgImage, profileImage, name, title, bio, messageLink });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isHome = await Home.find({});
        if (isHome.length !== 0 ) {
            return res.status(501).json({
                message: 'Home Created Failed Please Update Existing Home'
            });
        };
        const newHome = await Home({
            bgImage,
            profileImage,
            name,
            title,
            bio,
            messageLink
        })
        const savedHome = await newHome.save();
        return res.status(201).json({
            message: 'Home Created Successfully',
            result: savedHome
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.homeUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { bgImage, profileImage, name, title, bio, messageLink } = req.body;
        const validate = homeValidator({ bgImage, profileImage, name, title, bio, messageLink });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Home.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Item Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };

        const updated = await Home.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                bgImage,
                profileImage,
                name,
                title,
                bio,
                messageLink
            }
        }, {
            new: true
        });
        if (!updated) {
            return res.status(304).json({
                message: 'Update Failed'
            });
        };
        return res.status(202).json({
            message: 'Home Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

