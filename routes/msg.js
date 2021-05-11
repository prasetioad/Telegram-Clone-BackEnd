const router = require('express').Router();
const msg = require('../controllers/msg');
const { Auth } = require('../middleware/auth');


router.get('/', msg.getMsg)
router.post('/', msg.creatMsg)
router.get('/:destId', msg.getByDest)
router.delete('/:userId', msg.deleteByDest)

module.exports = router