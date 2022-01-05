const express = require('express');
const userController = require('./userController');
const router = express.Router();

router
    .post(`/userLogin`, userController.userLogin)

module.exports = router;