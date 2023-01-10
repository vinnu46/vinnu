const express = require('express');
const item = require('../controllers/item');

const router = express.Router();

router.get('/',item.getItems);
router.get('/:itemID',item.getItem);

module.exports = router;