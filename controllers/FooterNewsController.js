const FooterNews = require('../models/FooterNews');
const validator = require(('validator'));
const AchievementCounter = require('../models/AchievementCounter');

exports.footerNewsGetController = async ( req, res ) => {
    try {
        const footers = await FooterNews.find({});
        if (!footers) {
            return res.status(404).json({
                message: 'Not Found'
            });
        } else if (footers.length < 1) {
            return res.status(404).json({
                message: 'Not Found'
            });
        };
        return res.status(200).json({
            message: 'Contact Retrieved Successfully',
            result: footers
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.footerNewsPostController = async ( req, res ) => {
    try {
        const { email } = await req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Please Provide A Email'
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Please Provide A Valid Email'
            });
        };
        const newEmail = await FooterNews({
            email
        });
        const savedEmail = await newEmail.save();
        if (!savedEmail) {
            return res.status(501).json({
                message: 'Subscribe Failed'
            });
        };

        const id = '68cda3997786c6694468af79';
        await AchievementCounter.findByIdAndUpdate({
            _id: id
        }, {
            $inc: {
                number: 1
            }
        }, {
            new: true
        });

        return res.status(201).json({
            message: 'Thanks For Subscribe',
            result: savedEmail
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

