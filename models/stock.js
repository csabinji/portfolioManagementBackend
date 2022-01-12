const mongoose = require(`mongoose`);

const Stock = mongoose.model(`Stock`, {
    stockName: {
        type: String
    },
})

module.exports = Stock;