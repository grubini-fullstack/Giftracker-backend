const router = require('express').Router();
const { UserController } = require('../controllers');

router.get('/login', UserController.getUser);
router.get('/exists', UserController.userExists);
router.post('/create', UserController.createUser);
router.put('/update', UserController.updateUser);
router.delete('/delete', UserController.deleteUser);

module.exports = router;