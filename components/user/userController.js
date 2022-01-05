const User = require(`./../../models/user`);
const jwt = require(`jsonwebtoken`);
const { JWT_SECRET } = require(`../../config/env`);
module.exports = {
    userLogin: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username: username, password: password });
            if (!user) {
                if (user[`username`]) {
                    res.status(401).json({ success: false, message: `Username and Password donot match!` });
                }
                await User.create(req.body);
            }
            const token = jwt.sign({ uid: user._id }, JWT_SECRET)
            res.status(200).json({ success: true, token: token });
        } catch (err) {
            res.status(401).json({ error: err })
        }
    }
}