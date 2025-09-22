const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
    serviceGetController, servicePostController, serviceUpdateController
} = require('../controllers/serviceController');
 
router.get('/', serviceGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), servicePostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), serviceUpdateController);

module.exports = router;