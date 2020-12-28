const express = require('express')
const router = express.Router();
const { ProductController } = require('../controllers');

router.get('/product', ProductController.searchProduct);
router.get('/establishment', ProductController.searchStore);

module.exports = router;