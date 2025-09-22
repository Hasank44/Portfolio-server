const ContactSocial = require('../models/ContactSocial');
const contactSocialValidator = require('../validators/contactSocialValidator');
const { default: mongoose } = require('mongoose');

exports.contactSocialGetController = async ( req, res ) => {
    try {
        const social = await ContactSocial.find({});
        if (!social) {
            return res.status(404).json({
                message: 'Not Found'
            });
        } else if (social.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Contact Retrieved Successfully',
            result: social
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactSocialPostController = async ( req, res ) => {
    try {
        const { icon, link } = await req.body;
        const validate = contactSocialValidator({ icon, link });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isSocial = await ContactSocial.find({});
        if (isSocial.length === 5) {
            return res.status(501).json({
                message: 'Contact Create Failed Please Update Existing Contacts'
            });
        };
        const newSocial = await ContactSocial({
            icon,
            link
        });
        const savedSocial = await newSocial.save();
        if (!savedSocial) {
            return res.status(501).json({
                message: 'Contact Create Failed'
            });
        };
        return res.status(201).json({
            message: 'Contact Created Successfully',
            result: savedSocial
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactSocialUpdateController = async ( req, res ) => {
    try {
        const { id } = await req.params;
        const { icon, link } = await req.body;
        const validate = contactSocialValidator({ icon, link });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await ContactSocial.findById(id);
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
        const updated = await ContactSocial.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                icon,
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

