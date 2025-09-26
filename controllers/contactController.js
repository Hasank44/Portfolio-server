const Contact = require('../models/Contact');
const AchievementCounter = require('../models/AchievementCounter');
const contactValidator = require('../validators/contactValidator');
const { default: mongoose } = require('mongoose');

exports.contactGetController = async ( req, res ) => {
    try {
        const contacts = await Contact.find({});
        if (!contacts) {
            return res.status(404).json({
                message: 'Contact Not Found'
            });
        };
        return res.status(200).json({
            message: 'Contact Retrieved Successfully',
            result: contacts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactPostController = async ( req, res ) => {
    try {
        const { name, email, subject, message } = await req.body;
        const validate = contactValidator({ name, email, subject, message });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        const newContact = await Contact({
            name,
            email,
            subject,
            message
        });
        const savedContact = await newContact.save();
        if (!savedContact) {
            return res.status(501).json({
                message: 'Massage Sent Failed'
            });
        };
        const id = '68cda3997786c6694468af79';
        await AchievementCounter.findByIdAndUpdate(
            id,
            { $inc: { number: 1 } },
            { new: true }
        );
        
        return res.status(201).json({
            message: 'Message Sent Successfully',
            result: savedContact
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.contactDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const matchId = await Contact.findById(id);
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

        await Contact.findOneAndDelete({ _id: id });
        return res.status(200).json({
            message: 'Contact Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};
