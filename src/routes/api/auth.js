const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { User } = require("../../database/config/tables");
const moment = require("moment");
const jwt = require("jwt-simple");

router.post(
    "/register",
    [
        check("username", "username is required.").not().isEmpty(),
        check("password", "password is required.").not().isEmpty(),
        check("password", "password is not strong.").isStrongPassword(),
        check("email", "email is required.").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create(req.body);
            res.status(201).json({
                message: "User created.",
                errors: [],
                user: user,
            });
        } catch (error) {
            console.log(error);
            res.status(422).json({
                message: "User not created. " + error.message,
            });
        }
    }
);

router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
        const isEqual = bcrypt.compareSync(req.body.password, user.password);
        if (isEqual) {
            res.json({
                message: "Login success",
                errors: [],
                token: createToken(user),
            });
        } else {
            res.json({ errors: { msg: "User/Password incorrect." } });
        }
    } else {
        res.json({ errors: { msg: "User/Password incorrect." } });
    }
});

const createToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(90, "minutes").unix(),
    };
    return jwt.encode(payload, process.env.SECRET_KEY);
};

module.exports = router;
