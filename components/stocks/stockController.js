const Stock = require(`../../models/stock`);
const UserStock = require("../../models/userStock");
const TransactionHistory = require(`../../models/transactionHistory`);

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
            const stocks = await UserStock.find().lean();
            res.status(200).json({ status: true, message: `All Stocks Retrieved!`, data: stocks });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    getEachStock: async (req, res, next) => {
        try {
            const { stockId } = req.params
            const stock = await UserStock.findOne({ _id: stockId }).lean();
            res.status(200).json({ status: true, message: `Stock Retrieved!`, data: stock });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    transactionHistory: async (req, res, next) => {
        try {
            const transactions = await TransactionHistory.find().lean();
            res.status(200).json({ status: true, message: `Transaction Retrieved Successfully!`, data: transactions });
        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    buySellStock: async (req, res, next) => {
        try {
            const { status } = req.params;
            const { stockName } = req.body;
            let resMessage = ``;
            const alreadyBought = await UserStock.findOne({ stockName: stockName })
            if (alreadyBought) {
                if (status === `sell`) {
                    if (alreadyBought[`stockName`] !== stockName) {
                        res.status(401).json({ success: false, message: `You donot Have this Script!` });
                    } else if (alreadyBought[`total`] < req.body[`total`]) {
                        res.status(401).json({ success: false, message: `You donot have enough Share units` })
                    }
                }
                const total = status === `buy` ? parseInt(req.body[`total`]) : -parseInt(req.body[`total`]);
                const price = status === `buy` ? (alreadyBought[`price`] + parseInt(req.body[`price`])) / 2 : req.body[`price`]
                console.log(parseInt(req.body[`price`]))
                await UserStock.updateOne({ stockName: stockName }, { $inc: { total }, price })
            } else {
                await UserStock.create({ status: `${status}`, ...req.body });
            }
            await TransactionHistory.create({ status: `${status}`, ...req.body })
            resMessage = status === `buy` ? `Stocks Bought Successfully!` : `Stocks Sold Successfully!`
            res.status(200).json({ status: true, message: resMessage });

        } catch (error) {
            res.status(401).json({ error: error });
        }
    },
    dashboard: async (req, res, next) => {
        try {
            const total = await UserStock.aggregate(
                [
                    {
                        $group:
                        {
                            _id: null,
                            total: { $sum: "$total" },
                            currentAmount: { $sum: { $multiply: ["$price", "$total"] } }
                        }
                    }
                ]
            )
            const investment = await TransactionHistory.aggregate([
                { $match: { status: `buy` } },

                {
                    $group: {
                        _id: null,
                        totalInvestment: { $sum: { $multiply: ["$price", "$total"] } }
                    }
                }]
            )
            const sold = await TransactionHistory.aggregate([
                { $match: { status: `sell` } },

                {
                    $group: {
                        _id: null,
                        soldAmount: { $sum: { $multiply: ["$price", "$total"] } }
                    }
                }]
            )
            res.status(200).json({ status: true, data: { total, investment, sold } })
        } catch (error) {
            res.status(401).json({ error: error });
        }
    }
};