const Admin = require('../../models/Admin');
const adminRegisterValidator = require('../../validators/adminRegisterValidator');
const adminLoginValidator = require('../../validators/adminLoginValidator');
const verifyToken = require('../../utils/verifyToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.adminGetController = async ( req, res ) => {
    try {
        const admins = await Admin.find({});
        if (!admins) {
            return res.status(404).json({
                message: 'Admin Not Found'
            });
        };
        if (admins.length < 1 ) {
            return res.status(404).json({
                message: 'Admin Not Found'
            });
        };
        return res.status(200).json({
            message: 'All Admins',
            result: admins
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.adminRegisterController = async ( req, res ) => {
    try {
        const { name, email, password, confirmPassword } = await req.body;
        const validate = adminRegisterValidator({ name, email, password, confirmPassword });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        let isEmail = await Admin.findOne({ email });
        if (isEmail) {
            return res.status(409).json({
                message: 'Email Already Exist'
            });
        };
        const hash = await bcrypt.hash(password, 11)
        const newAdmin = new Admin({
            name,
            email,
            password: hash,
            role: 'user'
        });
        let savedAdmin = await newAdmin.save();
        return res.status(201).json({
            message: 'Admin Added Successfully',
            result: savedAdmin
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};

exports.adminLoginController = async ( req, res ) => {
    try {
        const { email, password } = await req.body;
        const validate = adminLoginValidator({ email, password });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        };
        let findAdmin = await Admin.findOne({ email });
        if (!findAdmin) {
            return res.status(404).json({
                message: 'Admin Not Exist'
            });
        };
        const isMatch = await bcrypt.compare(password, findAdmin.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Incorrect Password'
            });
        };
        let token = await jwt.sign({
            _id: findAdmin._id,
            name: findAdmin.name,
            email: findAdmin.email,
            role: findAdmin.role
        },SECRET, {
            expiresIn: '24h'
        });
        return res.status(200).json({
            message: 'Admin Login Successfully',
            token:`Bearer ${token}`
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error Occurred'
        });
    };
};