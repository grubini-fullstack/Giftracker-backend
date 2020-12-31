const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

router.get('/exists', UserController.userExists);
router.post('/login', UserController.login);
router.post('/create', UserController.createUser);
router.put('/update', UserController.updateUser);
router.delete('/delete', UserController.deleteUser);

module.exports = router;