const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const { 
    projectEnable
 } = require('../controllers/projectEnableController');
router.put('/:id', authMiddleware, roleMiddleware('admin'), projectEnable);

module.exports = router;