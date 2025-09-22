const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    achieveGetController, achievePostController
} = require('../controllers/achievementCountController');
 
router.get('/', achieveGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), achievePostController);

module.exports = router;