const database = require("../models");
const ROLES = database.ROLES;
const User = database.user;

/**
 * This function checks if the username or the email 
 * has been used before 
 * @param {object} req
 * @param {object} res
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //Check if the username exists already
    const { username, email } = req.body;
    console.log("heree", username, email)
    const user = await User.findOne({ username: username });
    const user_ = await User.findOne({ email: email });
    if (user) {
        res.status(400).send({ message: "Middleware: Username is already in use!" });
    }
    if (user_) {
        res.status(500).send({ message: "Middleware: Email is already in use!" });
        return;
    }
    next();
};

/**
 * This function checks if the role sent by the
 * request is valid
 * @param {object} req
 * @param {object} res
 */
const checkRolesExisted = async (req, res, next) => {
    const { roles } = req.body;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};


const verifyAuthentication = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifyAuthentication;