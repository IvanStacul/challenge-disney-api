const jwt = require("jwt-simple");
const moment = require("moment");

const checkToken = (req, res, next) => {
    if (!req.headers["auth-token"]) {
        return res.status(403).json({
            errors: {
                msg: "Token not found.",
            },
        });
    }

    const userToken = req.headers["auth-token"];
    let payload = {};

    try {
        payload = jwt.decode(userToken, process.env.SECRET_KEY);
    } catch (error) {
        return res.json({
            errors: {
                msg: "Incorrect Token." + error,
            },
        });
    }

    if (payload.expiredAt < moment().unix()) {
        return res.json({
            errors: {
                msg: "Expired Token.",
            },
        });
    }

    next();
};

module.exports = { checkToken: checkToken };
