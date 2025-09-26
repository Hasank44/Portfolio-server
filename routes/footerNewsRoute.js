const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    footerNewsGetController, footerNewsPostController, footerNewsDeleteController
 } = require('../controllers/FooterNewsController');

router.get('/', authMiddleware, roleMiddleware('admin'), footerNewsGetController);
router.post('/', footerNewsPostController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), footerNewsDeleteController);

module.exports = router;