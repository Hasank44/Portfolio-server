const About = require('../models/About');
const aboutValidator = require('../validators/aboutValidator');
const { default: mongoose } = require('mongoose');

exports.aboutGetController = async ( req, res ) => {
    try {
        const about = await About.find({});
        if (!about) {
            return res.status(404).json({
                message: 'About Not Found'
            });
        };
        if (about.length < 1) {
            return res.status(404).json({
                message: 'About Not Found'
            });
        };
        return res.status(200).json({
            message: 'About Retrieved Successfully',
            result: about
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.aboutPostController = async ( req, res ) => {
    try {
        const { name, title, description, image, cvLink } = await req.body;
        const validate = aboutValidator({ name, title, description, image, cvLink });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isAbout = await About.find({});
        if (isAbout.length !== 0) {
            return res.status(500).json({
                message: 'Add Failed Please Update Existing About'
            });
        };
        let newAbout = await About({
            name,
            title,
            description,
            image,
            cvLink
        });
        const saveAbout = await newAbout.save();
        return res.status(201).json({
            message: 'About Added Successfully',
            result: saveAbout
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.aboutUpdateController = async ( req, res ) => {
    const { id } = req.params;
    try {
        const { name, title, description, image, cvLink } = req.body;
        const validate = aboutValidator({ name, title, description, image, cvLink });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await About.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'About Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params ID'
            });
        };
        const updated = await About.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name,
                title,
                description,
                image,
                cvLink
            }
        }, {
            new: true
        });
        if (!updated) {
            return res.status(304).json({
                message: 'About Update Failed',
            });
        };
        return res.status(202).json({
            message: 'About Update Success',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};
