const database = require("../models");
const ROLES = database.ROLES;
const User = database.user;

/**
 * This function checks if the username or the email 
 * has been used before 
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //Check if the username exists already
    const { username, email } = req.body;
    User.findOne({
        username: username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        //Check if the email exists already
        User.findOne({
            email: email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

/**
 * This function checks if the role sent by the
 * request is valid
 * @param {object} req
 * @param {object} res
 * @param {function} next
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