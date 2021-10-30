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
            return res
                .status(400)
                .json({
                    status: "fail",
                    data: [],
                    message: "Body params invalid.",
                    errors: errors.array(),
                });
        }

        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create(req.body);
            res.status(201).json({
                status: "success",
                data: user,
                message: "User created.",
                errors: [],
            });
        } catch (error) {
            console.log(error);
            res.status(422).json({
                status: "fail",
                data: [],
                message: "User not created.",
                error: error.message,
            });
        }
    }
);

router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
        const isEqual = bcrypt.compareSync(req.body.password, user.password);
        if (isEqual) {
            res.status(200).json({
                status: "success",
                data: [],
                message: "Login success",
                errors: [],
                token: createToken(user),
            });
        }
    }
    res.status(401).json({
        status: "fail",
        data: [],
        message: "Incorrect username or password.",
        errors: [],
    });
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
