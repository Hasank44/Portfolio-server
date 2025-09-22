const ContactLocation = require('../models/ContactLocation');
const contactLocationValidator = require('../validators/contactLocationValidator');
const { default: mongoose } = require('mongoose');

exports.contactLocationGetController = async ( req, res ) => {
    try {
        const location = await ContactLocation.find({});
        if (!location) {
            return res.status(404).json({
                message: 'Not Found'
            });
        } else if (location.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Contact Retrieved Successfully',
            result: location
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactLocationPostController = async ( req, res ) => {
    try {
        const { icon, title, link } = await req.body;
        const validate = contactLocationValidator({ icon, title, link });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };

        const isLocation = await ContactLocation.find({});
        if (isLocation.length === 4) {
            return res.status(501).json({
                message: 'Contact Add Failed Please Update Existing Contacts'
            });
        };
        
        const newLocation = await ContactLocation({
            icon,
            title,
            link
        });
        const savedLocation = await newLocation.save();
        if (!savedLocation) {
            return res.status(501).json({
                message: 'Contact Create Failed'
            });
        };
        return res.status(201).json({
            message: 'Contact Created Successfully',
            result: savedLocation
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactLocationUpdateController = async ( req, res ) => {
    try {
        const { id } = await req.params;
        const { icon, title, link } = await req.body;
        const validate = contactLocationValidator({ icon, title, link });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await ContactLocation.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Contact Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params ID'
            });
        };

        const updated = await ContactLocation.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                icon,
                title,
                link
            }
        }, {
            new: true
        });
        if (!updated) {
            return res.status(304).json({
                message: 'Contact Update Failed'
            });
        };
        return res.status(202).json({
            message: 'Contact Update SuccessFully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};
