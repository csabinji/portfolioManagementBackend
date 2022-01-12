const mongoose = require(`mongoose`);

const UserStock = mongoose.model(`UserStock`, {
    stockName: {
        type: String
    },
    total: {
        type: Number
    },
    price: {
        type: Number
    }
})

module.exports = UserStock;