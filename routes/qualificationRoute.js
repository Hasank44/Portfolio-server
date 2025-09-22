const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    qualificationGetController, qualificationPostController, qualificationUpdateController
 } = require('../controllers/qualificationController');

router.get('/', qualificationGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), qualificationPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), qualificationUpdateController);

module.exports = router;