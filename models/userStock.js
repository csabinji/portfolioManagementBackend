const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema.Types;

const UserStock = mongoose.model(`UserStock`, {
    stockName: { type: String },
    total: { type: Number },
    price: { type: Number },
    transactionDate: { type: Date },
    status: { type: String },

})

module.exports = UserStock;