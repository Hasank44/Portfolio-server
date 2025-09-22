const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    contactSocialGetController, contactSocialPostController, contactSocialUpdateController
} = require('../controllers/contactSocialController');
 
router.get('/', contactSocialGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), contactSocialPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), contactSocialUpdateController);

module.exports = router;