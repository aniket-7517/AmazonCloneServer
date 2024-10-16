const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('images', 5), productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', isAdmin, productController.deleteProduct);

module.exports = router;