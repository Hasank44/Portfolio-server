const Service = require('../models/Service');
const serviceValidator = require('../validators/serviceValidator');
const { default: mongoose } = require('mongoose');

exports.serviceGetController = async ( req, res ) => {
    try {
        const services = await Service.find({});
        if (!services) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        if (services.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Service Retrieved Successfully',
            result: services
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.enableServiceGetController = async (req, res) => {
    try {
        const enableServices = await Service.find({ isEnable: true });
        if (!enableServices || enableServices.length < 1) {
            return res.status(404).json({
                message: 'Projects Not Found'
            });
        };
        return res.status(200).json({
            message: 'Enable Projects Retrieved Successfully',
            result: enableServices
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.servicePostController = async ( req, res ) => {
    try {
        const { icon ,title, description } = req.body;
        const validate = serviceValidator({ icon, title, description });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const newService = await Service({
            icon,
            title,
            description,
        })
        const savedService = await newService.save();
        return res.status(201).json({
            message: 'Service Created Successfully',
            result: savedService
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.serviceUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { icon, title, description } = req.body;
        const validate = serviceValidator({ icon, title, description});
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Service.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Service Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };

        const updated = await Service.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                icon,
                title,
                description
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
            message: 'Service Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.serviceDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const matchId = await Service.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Skill Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };

        await Service.findOneAndDelete({ _id: id });
        return res.status(200).json({
            message: 'Service Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};