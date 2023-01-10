const express = require('express');
const cart = require('../controllers/cart');
const authMiddleware = require('../controllers/auth-middleware');

const router = express.Router();

router.get('/', authMiddleware,cart.getCart);
router.post('/add', authMiddleware,cart.postAddToCart);
router.post('/remove', authMiddleware,cart.postRemoveFromCart);


module.exports = router;