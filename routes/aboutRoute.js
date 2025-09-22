const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    aboutGetController, aboutPostController, aboutUpdateController,
} = require('../controllers/aboutController');

router.get('/', aboutGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), aboutPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), aboutUpdateController);

module.exports = router;