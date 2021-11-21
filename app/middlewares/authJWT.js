const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const database = require("../models");
const User = database.user;
const Role = database.role;

/**
 * This function checks if the JWT 
 * token provided is valid
 * @param {object} req
 * @param {object} res
 */
const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(//To verify the token
        token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            next();
        });
};

/**
 * This function checks if the user 
 * is an admin
 * @param {object} req
 * @param {object} res
 */
const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId);
    if (!user) {
        res.status(500).send({ message: 'Middleware: User not found' });
        return;
    }
    const roles = await Role.find({
        _id: { $in: user.roles }
    });
    if (!roles) {
        res.status(500).send({ message: 'Middleware: Role not found' });
        return;
    }
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    res.status(403).send({ message: "Middleware: Not an Admin" });
    return;


}

/**
 * This function checks if the user 
 * is a moderator
 * @param {object} req
 * @param {object} res
 */
const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
        res.status(500).send({ message: 'Middleware: User not found' });
        return;
    }
    const roles = await Role.find({
        _id: { $in: user.roles }
    });
    if (!roles) {
        res.status(500).send({ message: "Middleware: Role not found" });
        return;
    }
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    res.status(403).send({ message: "Middleware: Not a moderator!" });
    return;
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;