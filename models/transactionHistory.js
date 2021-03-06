const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema.Types;

const TransactionHistory = mongoose.model(`TransactionHistory`, {
    stockId: {
        type: ObjectId,
        ref: `UserStock`,
        required: true
    },
    total: {
        type: Number
    },
    price: {
        type: Number
    },
    transactionDate: {
        type: Date
    },
    status: {
        type: String
    },
})

module.exports = TransactionHistory;