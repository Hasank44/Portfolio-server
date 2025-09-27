const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
    serviceGetController, servicePostController, serviceUpdateController, serviceDeleteController
} = require('../controllers/serviceController');
 
router.get('/', authMiddleware, roleMiddleware('admin'), serviceGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), servicePostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), serviceUpdateController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), serviceDeleteController);

module.exports = router;