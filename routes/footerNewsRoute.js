const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    footerNewsGetController, footerNewsPostController
 } = require('../controllers/FooterNewsController');

router.get('/', authMiddleware, roleMiddleware('admin'), footerNewsGetController);
router.post('/', footerNewsPostController);

module.exports = router;