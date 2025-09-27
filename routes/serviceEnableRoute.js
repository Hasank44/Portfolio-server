const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const { 
    serviceEnable
} = require('../controllers/serviceEnableController');
const { 
    enableServiceGetController
 } = require('../controllers/serviceController');

router.get('/', enableServiceGetController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), serviceEnable);

module.exports = router;