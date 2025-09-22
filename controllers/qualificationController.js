const Qualification = require('../models/Qualification');
const qualificationValidator = require('../validators/qualificationValidator');
const { default: mongoose } = require('mongoose');


exports.qualificationGetController = async ( req, res ) => {
    try {
        const qualification = await Qualification.find({});
        if (!qualification) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        if (qualification.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Qualification Retrieved Successfully',
            result: qualification
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.qualificationPostController = async ( req, res ) => {
    try {
        const { title, place,  description, image } = req.body;
        const validate = qualificationValidator({ title, place, description, image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isQualification = await Qualification.find({});
        if (isQualification.length === 3 ) {
            return res.status(501).json({
                message: 'Qualification Created Failed Please Update Existing Qualification'
            });
        };
        const newQualification = await Qualification({
            title,
            description,
            place,
            image
        })
        const savedQualification = await newQualification.save();
        return res.status(201).json({
            message: 'Qualification Created Successfully',
            result: savedQualification
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.qualificationUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { title, description, place, image } = req.body;
        const validate = qualificationValidator({ title, description, place, image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Qualification.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Qualification Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };
        const updated = await Qualification.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title,
                description,
                place,
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
            message: 'Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};