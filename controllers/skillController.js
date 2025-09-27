const Skill = require('../models/Skill');
const skillValidator = require('../validators/skillValidator');
const { default: mongoose } = require('mongoose');

exports.skillGetController = async ( req, res ) => {
    try {
        const skills = await Skill.find({});
        if (!skills) {
            return res.status(404).json({
                message: 'Skills Not Found'
            });
        };
        if (skills.length < 1) {
            return res.status(404).json({
                message: 'Skills Not Found'
            });
        };
        return res.status(200).json({
            message: 'Skills Retrieved Successfully',
            result: skills
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.enableSkillGetController = async (req, res) => {
    try {
        const enableSkills = await Skill.find({ isEnable: true });
        if (!enableSkills || enableSkills.length < 1) {
            return res.status(404).json({
                message: 'Skill Not Found'
            });
        };
        return res.status(200).json({
            message: 'Enable Skills Retrieved Successfully',
            result: enableSkills
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.skillPostController = async ( req, res ) => {
    try {
        const { title, icon, type } = req.body;
        const validate = skillValidator({ title, icon, type });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const newSkill = await Skill({
            title,
            icon,
            type
        })
        const savedSkill = await newSkill.save();
        return res.status(201).json({
            message: 'Skill Created Successfully',
            result: savedSkill
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.skillUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { title, icon, type } = req.body;
        const validate = skillValidator({ title, icon, type });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Skill.findById(id);
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

        const updated = await Skill.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title,
                icon,
                type
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
            message: 'Skill Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.skillDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const matchId = await Skill.findById(id);
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

        await Skill.findOneAndDelete({ _id: id });
        return res.status(200).json({
            message: 'Skill Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};