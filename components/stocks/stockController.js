const Stock = require(`../../models/stock`);
const User = require(`../../models/user`);
const UserStock = require("../../models/userStock");

module.exports = {
    addStock: async (req, res, next) => {
        try {
            await Stock.create(req.body);
            res.status(200).json({ status: true, message: `New Stock Added Successfully!` });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    getStocks: async (req, res, next) => {
        try {
            const stocks = await Stock.find().lean();
            res.status(200).json({ status: true, message: `Stocks Retrieved!`, data: stocks });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    buySellStock: async (req, res, next) => {
        try {
            const userId = req.User[`_id`];
            const { stockId, status } = req.params;
            const { total, price } = req.body;
            const today = new Date();
            if (status === `buy`) {
                await UserStock.findOneAndUpdate(
                    { userId: userId },
                    { $push: { boughtStocks: { stock: stockId, total, price, transactionDate: today } } },
                    { upsert: true }
                );
                res.status(200).json({ status: true, message: `Stocks Bought Successfully!` });
            } else if (status === `sell`) {
                await UserStock.findOneAndUpdate(
                    { userId: userId },
                    {
                        $push: { soldStocks: { stock: stockId, total, price, transactionDate: today } },
                    },
                    { upsert: true }
                );
                res.status(200).json({ status: true, message: `Stock Sold!` });
            } else {
                res.status(401).json({ status: false, message: `You donot have this script in your stock!` });
            }
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    dashboard: async (req, res, next) => {
        try {
            const userId = req.User[`_id`];
            const total = await UserStock.aggregate([{
                $match: {
                    userId: userId
                }
            },
            {
                $addFields: {
                    totalUnits: { $sum: `$boughtStocks.total` },
                    total: { $multiply: ["$boughtStocks.total", "$boughtStocks.price"] }
                }
            }
            ])
            console.log(total);
        } catch (error) {
            res.status(401).json({ error: error });
        }
    }
};