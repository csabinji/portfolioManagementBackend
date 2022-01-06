const express = require('express');
const stockController = require('./stockController');
const router = express.Router();
const { verifyUser } = require(`../../middleware/authUser`)

router
    .post(`/addStock`, stockController.addStock)
    .get(`/getStocks`, stockController.getStocks)
    .post(`/buySellStock/:status`, stockController.buySellStock)
    .get(`/dashboard`, verifyUser, stockController.dashboard)
    .get(`/getUserStocks`, stockController.getUserStocks)

module.exports = router;