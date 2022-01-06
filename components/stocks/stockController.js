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
    getUserStocks: async (req, res, next) => {
        try {
            const userId = req.User[`_id`];
            const stocks = await UserStock.find({ userId: userId })
            res.status(200).json({ status: true, message: `All Stocks Retrieved!`, data: stocks });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    buySellStock: async (req, res, next) => {
        try {
            const userId = req.User[`_id`];
            const { status } = req.params;
            const { stockName, total, price } = req.body;
            let resMessage = ``;
            const today = new Date();
            await UserStock.findOneAndUpdate(
                { userId: userId },
                { stockName, status: `${status}`, total, price, transactionDate: today }
            );
            resMessage = status === `buy` ? `Stocks Bought Successfully!` : `Stocks Sold Successfully!`
            res.status(200).json({ status: true, message: resMessage });

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