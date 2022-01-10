const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema.Types;

const TransactionHistory = mongoose.model(`TransactionHistory`, {
    stockId: { type: ObjectId, ref: 'UserStock', default: null },
    stockName: { type: String },
    total: { type: Number },
    price: { type: Number },
    transactionDate: { type: Date },
    status: { type: String },
})

module.exports = TransactionHistory;