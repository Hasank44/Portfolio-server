const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    homeGetController, homePostController, homeUpdateController
 } = require('../controllers/homeController');

router.get('/', homeGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), homePostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), homeUpdateController);

module.exports = router;