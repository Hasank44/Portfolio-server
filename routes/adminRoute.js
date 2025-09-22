const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    adminRegisterController, adminLoginController
 } = require('../controllers/auth/adminController');

router.post('/register', authMiddleware, roleMiddleware('admin'), adminRegisterController);
router.post('/login', adminLoginController);

module.exports = router;