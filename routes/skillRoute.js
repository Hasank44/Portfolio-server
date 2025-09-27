const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
    skillGetController, skillPostController, skillUpdateController, skillDeleteController
} = require('../controllers/skillController');
 
router.get('/', authMiddleware, roleMiddleware('admin'), skillGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), skillPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), skillUpdateController);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), skillDeleteController);

module.exports = router;