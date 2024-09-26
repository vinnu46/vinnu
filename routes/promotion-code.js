const express = require('express');
const promotionCode = require('../controllers/promotion-code');
const authMiddleware = require('../controllers/auth-middleware');

const router = express.Router();

router.post('/',authMiddleware,promotionCode.postCheckPromotionCode);

module.exports = router;