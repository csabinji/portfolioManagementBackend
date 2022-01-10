const mongoose = require(`mongoose`);

const Stock = mongoose.model(`Stock`, {
    stockName: String
})

module.exports = Stock;