const mongoose = require(`mongoose`);
const { ObjectId } = mongoose.Schema.Types;

const UserStock = mongoose.model(`UserStock`, {
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    boughtStocks: [
        {
            total: { type: Number },
            price: { type: Number },
            transactionDate: { type: Date },
            stock: {
                type: ObjectId,
                ref: 'Stock',
                required: true
            }
        }
    ],
    soldStocks: [
        {
            total: { type: Number },
            price: { type: Number },
            transactionDate: { type: Date },
            stock: {
                type: ObjectId,
                ref: 'Stock',
                required: true
            }
        }
    ]
})

module.exports = UserStock;