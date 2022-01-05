const mongoose = require(`mongoose`);

const Stock = mongoose.model(`Stock`, {
    stockName: String,
    transactionType: String,
    transactionDate: Date,
    quantity: Number,
    amount: Number,
})

module.exports = Stock;