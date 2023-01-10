const express = require('express');
const purchase = require('../controllers/purchase');
const authMiddleware = require('../controllers/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware,purchase.postPurchase);
router.get('/', authMiddleware,purchase.getPurchase);


module.exports = router;