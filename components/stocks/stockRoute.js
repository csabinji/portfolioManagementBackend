const express = require('express');
const stockController = require('./stockController');
const router = express.Router();

router
    .post(`/addStock`, stockController.addStock)

module.exports = router;