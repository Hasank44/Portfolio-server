const Navbar = require('../models/Navbar');
const navbarValidator = require('../validators/navbarValidator');
const { default: mongoose } = require('mongoose');

exports.navbarGetController = async ( req, res ) => {
    try {
        const image = await Navbar.find({});
        if (!image) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        if (image.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Image Upload Successfully',
            result: image
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.navbarPostController = async ( req, res ) => {
    try {
        const { image } = req.body;
        const validate = navbarValidator({ image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isImage = await Navbar.find({});
        if (isImage.length !== 0 ) {
            return res.status(501).json({
                message: 'Image Upload Failed Please Update Existing Image'
            });
        };
        const newNavbar = await Navbar({
            image
        })
        const savedNav = await newNavbar.save();
        return res.status(201).json({
            message: 'Image Upload Successfully',
            result: savedNav
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.navbarUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { image } = req.body;
        const validate = navbarValidator({ image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Navbar.findById(id);
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

        const updated = await Navbar.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                image
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
            message: 'Logo Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};