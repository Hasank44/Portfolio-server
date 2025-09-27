const Project = require('../models/Project');
const AchievementCounter = require('../models/AchievementCounter');
const projectValidator = require('../validators/projectValidator');
const { default: mongoose } = require('mongoose');

exports.projectGetController = async ( req, res ) => {
    try {
        const projects = await Project.find({});
        if (!projects) {
            return res.status(404).json({
                message: 'Projects Not Found'
            });
        };
        if (projects.length < 1) {
            return res.status(404).json({
                message: 'Projects Not Found'
            });
        };
        return res.status(200).json({
            message: 'Projects Retrieved Successfully',
            result: projects
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.enableProjectGetController = async (req, res) => {
    try {
        const enableProjects = await Project.find({ isEnable: true })
        if (!enableProjects || enableProjects.length < 1) {
            return res.status(404).json({
                message: 'Projects Not Found'
            });
        };
        return res.status(200).json({
            message: 'Enable Projects Retrieved Successfully',
            result: enableProjects
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.projectPostController = async ( req, res ) => {
    try {
        const { title, description, github, link, image } = req.body;
        const validate = projectValidator({ title, description, github, link, image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const newProject = await Project({
            title,
            description,
            github,
            link,
            image,
        })
        const savedProject = await newProject.save();
         if (!savedProject) {
            return res.status(501).json({
                message: 'Project Create Failed'
            });
        };

        // total project
        const id = '68cda3857786c6694468af73';
        await AchievementCounter.findByIdAndUpdate(
            id,
            { $inc: { number: 1 } },
            { new: true }
        );

        // award earn
        const totalProject = await AchievementCounter.findById(id);
        const award = Math.floor(totalProject.number / 10);
        const countId = '68cda38e7786c6694468af76'
        await AchievementCounter.findByIdAndUpdate({
            _id: countId
        }, {
            $set: { number: award }
        }, { new: true }
        );

        // satisfied clients
        const satisfiedClient = Math.floor(totalProject.number * (7 / 20));
        const satisfiedId = '68cda36e7786c6694468af70'
        await AchievementCounter.findByIdAndUpdate({
            _id: satisfiedId
        }, { $set: { number: satisfiedClient } }, {
            new: true
        });
        return res.status(201).json({
            message: 'Project Created Successfully',
            result: savedProject
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.projectUpdateController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { title, description, github, link, image } = req.body;
        const validate = projectValidator({ title, description, github, link, image });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const matchId = await Project.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Project Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };
        const updated = await Project.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title,
                description,
                github,
                link,
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
            message: 'Project Update Successfully',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.projectDeleteController = async ( req, res ) => {
    try {
        const { id } = req.params;
        const matchId = await Skill.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Project Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                message: 'Invalid Params Id'
            });
        };
        const deleted = await Project.findOneAndDelete({ _id: id });
        if (!deleted) {
            return res.status(200).json({
                message: 'Project Delete Successfully'
            });
        };
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};