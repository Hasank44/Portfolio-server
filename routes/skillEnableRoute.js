const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const { 
    skillEnable
} = require('../controllers/skillEnableController');
const { 
    enableSkillGetController
 } = require('../controllers/skillController');

router.get('/', enableSkillGetController);
router.put('/:id', authMiddleware, roleMiddleware('admin'), skillEnable);

module.exports = router;