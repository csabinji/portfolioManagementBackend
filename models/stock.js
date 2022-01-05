const mongoose = require(`mongoose`);

const Stock = mongoose.model(`Stock`, {
    stockName: String,
    pricePerUnit: Number,
})

module.exports = Stock;