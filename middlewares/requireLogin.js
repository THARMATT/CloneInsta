const jwt = require('jsonwebtoken');
const { Jwt_secret } = require('../keys');
const mongoose = require('mongoose');
const USER = mongoose.model("USER");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "").trim();

    try {
        const payload = jwt.verify(token, Jwt_secret);
        const { _id } = payload;

        const userData = await USER.findById(_id);

        if (userData) {
            req.user = userData;
            next();
        } else {
            return res.status(401).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
    }
};
