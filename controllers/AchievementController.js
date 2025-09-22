const Achievement = require('../models/Achievement');
const achievementValidator = require('../validators/achievementValidator');
const { default: mongoose } = require('mongoose');

exports.achievementGetController = async ( req, res ) => {
    try {
        const achievement = await Achievement.find({});
        if (!achievement) {
            return res.status(404).json({
                message: 'Achievement Not Found'
            });
        };
        if (achievement.length < 1) {
            return res.status(404).json({
                message: 'Achievement Not found'
            });
        };
        return res.status(200).json({
            message: 'Achievement Retrieved Successfully',
            result: achievement
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.achievementPostController = async ( req, res ) => {
    try {
        const { title, description } = req.body;
        const validate = achievementValidator({ title, description });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const isAchievement = await Achievement.find({});
        if (isAchievement.length === 3 ) {
            return res.status(501).json({
                message: 'Achievement Add Failed Please Update Existing Achievements'
            });
        };
        const newAchievement = await Achievement({
            title,
            description
        });
        const savedAchievement = await newAchievement.save();
        return res.status(201).json({
            message: 'Achievement Added Successfully',
            result: savedAchievement
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};
exports.achievementUpdateController = async ( req, res ) => {
    try {
        const { id } = await req.params;
        const { title, description } = await req.body;

        const validate = achievementValidator({ title, description });
        if (!validate.isValid) {
            return res.status(400).json( validate.error);
        };
        const matchId = await Achievement.findById(id);
        if (!matchId) {
            return res.status(404).json({
                message: 'Achievement Not Found'
            });
        };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(501).json({
                message: 'Invalid Params ID'
            });
        };
        const updated = await Achievement.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title,
                description
            }
        }, {
            new: true
        });
        if (!updated) {
            return res.status(304).json({
                message: 'Achievement Update Failed'
            });
        };
        return res.status(202).json({
            message: 'Achievement Retrieved',
            result: updated
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};
