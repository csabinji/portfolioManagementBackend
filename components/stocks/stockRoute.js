const express = require('express');
const stockController = require('./stockController');
const router = express.Router();
const { verifyUser } = require(`../../middleware/authUser`)

router
    .post(`/addStock`, stockController.addStock)
    .get(`/getStocks`, stockController.getStocks)
    .get(`/buySellStock/:stockId/:status`, verifyUser, stockController.buySellStock)
    .get(`/dashboard`, verifyUser, stockController.dashboard)
    .get(`/getUserStocks`, verifyUser, stockController.getUserStocks)

module.exports = router;