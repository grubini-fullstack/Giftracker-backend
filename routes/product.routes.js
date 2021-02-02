const express = require('express')
const router = express.Router();
const { ProductController } = require('../controllers');
const { AuthMiddleware } = require('../middleware');

router.get('/search', ProductController.searchProduct);
router.get('/establishment', ProductController.searchStore);

router.use(AuthMiddleware);
router.post('/wishlist', ProductController.getWishList)
router.post('/addorupdate', ProductController.addProduct);
router.post('deleteproduct', ProductController.deleteProduct);


module.exports = router;