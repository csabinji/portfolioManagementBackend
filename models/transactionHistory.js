const mongoose = require(`mongoose`);

const TransactionHistory = mongoose.model(`TransactionHistory`, {
    stockName: { type: String },
    total: { type: Number },
    price: { type: Number },
    transactionDate: { type: Date },
    status: { type: String },
})

module.exports = TransactionHistory;