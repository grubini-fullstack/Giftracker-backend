const router = require('express').Router();
const ProductController = require('../controllers/product.controller');

router.get('/product', ProductController.searchProduct);
router.get('/establishment', ProductController.searchStore);

module.exports = router;