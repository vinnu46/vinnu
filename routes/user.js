const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.post('/signup', user.postUserSignUp);
router.post('/signin', user.postUserSignIn);


module.exports = router;
