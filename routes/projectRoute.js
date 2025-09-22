const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    projectGetController, projectPostController, projectUpdateController, projectDeleteController
} = require('../controllers/projectController');
 

router.get('/', projectGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), projectPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), projectUpdateController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), projectDeleteController);

module.exports = router;