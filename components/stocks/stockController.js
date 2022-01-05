const Stock = require("../../models/stock");

module.exports = {
    addStock: async (req, res, next) => {
        try {
            await Stock.create(req.body);
            res.status(200).json({ status: true, message: `New Stock Added Successfully!` });
        } catch (err) {
            res.status(401).json({ error: err })
        }
    }
};