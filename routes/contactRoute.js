const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    contactGetController, contactPostController, contactDeleteController
 } = require('../controllers/contactController');

router.get('/', authMiddleware, roleMiddleware('admin'),  contactGetController);
router.post('/', contactPostController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), contactDeleteController);

module.exports = router;