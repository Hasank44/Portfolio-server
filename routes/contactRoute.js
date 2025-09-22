const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    contactGetController, contactPostController
 } = require('../controllers/contactController');

router.get('/', authMiddleware, roleMiddleware('admin'),  contactGetController);
router.post('/', contactPostController);

module.exports = router;