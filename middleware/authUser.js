const jwt = require(`jsonwebtoken`);
const { JWT_SECRET } = require(`../config/env`);
const User = require(`../models/user`);

module.exports = {
    verifyUser: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, JWT_SECRET);
            await User.findOne({ _id: data.uid })
                .then(function (User) {
                    req.User = User;
                    next();
                })
                .catch(function (ex) {
                    res.status(401).json({ error: ex })
                })
        } catch (error) {
            res.status(401).json({ error: error })
        }
    }
};