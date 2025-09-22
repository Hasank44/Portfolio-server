const AchievementCounter = require('../models/AchievementCounter');

exports.achieveGetController = async ( req, res ) => {
    try {
        const achieves = await AchievementCounter.find({});
        if (!achieves) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        if (achieves.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Achievement Retrieved Successfully',
            result: achieves
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.achievePostController = async (req, res) => {
    try {
        const { number, label} = req.body;
        const isAchieve = await AchievementCounter.find({});
        if (isAchieve.length === 4) {
            return res.status(501).json({
                message: 'Achieve Created Failed Please Update Existing Achieves'
            });
        };
        const newAchieve = await AchievementCounter({
            number,
            label
        })
        const savedAchieve = await newAchieve.save();
        return res.status(201).json({
            message: 'Achieve Created Successfully',
            result: savedAchieve
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};