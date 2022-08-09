const { Router } = require('express');
const { getProductData, postNewProduct } = require('../controller/productController');

const router = Router();

router.get('/', getProductData)

router.post ('/add',postNewProduct)


module.exports = router;