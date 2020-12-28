const router = require('express').Router();
const { ProductController } = require('../controllers');

router.get('/product', ProductController.searchProduct);
router.get('/establishment', ProductController.searchStore);

module.exports = router;