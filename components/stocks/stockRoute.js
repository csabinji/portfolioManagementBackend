const express = require('express');
const stockController = require('./stockController');
const router = express.Router();

router
    .post(`/addStock`, stockController.addStock)
    .get(`/getStocks`, stockController.getStocks)
    .post(`/buySellStock/:status`, stockController.buySellStock)
    .get(`/dashboard`, stockController.dashboard)
    .get(`/getUserStocks`, stockController.getUserStocks)
    .get(`/transactionHistory`, stockController.transactionHistory)
    .get(`/getEachStock/:stockId`, stockController.getEachStock)

module.exports = router;