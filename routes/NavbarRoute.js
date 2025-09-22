const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    navbarGetController, navbarPostController, navbarUpdateController
} = require('../controllers/NavbarController');
 
router.get('/', navbarGetController);
router.post('/', authMiddleware, roleMiddleware('admin'), navbarPostController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), navbarUpdateController);

module.exports = router;