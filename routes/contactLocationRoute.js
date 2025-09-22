const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    contactLocationGetController, contactLocationPostController, contactLocationUpdateController
} = require('../controllers/contactLocationController');
 
router.get('/', contactLocationGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), contactLocationPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), contactLocationUpdateController);

module.exports = router;