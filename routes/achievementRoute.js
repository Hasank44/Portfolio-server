const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    achievementGetController, achievementPostController, achievementUpdateController
 } = require('../controllers/AchievementController');

router.get('/', achievementGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), achievementPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), achievementUpdateController);

module.exports = router;