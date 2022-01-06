const mongoose = require(`mongoose`);

const UserStock = mongoose.model(`UserStock`, {
    stockName: { type: String },
    total: { type: Number },
    price: { type: Number },
    amount: { type: Number },
    lastTransaction: { type: Date }
})

module.exports = UserStock;