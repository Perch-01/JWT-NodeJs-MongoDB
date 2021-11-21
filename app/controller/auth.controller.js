const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const database = require("../models");

const User = database.user;
const Role = database.role;


const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
    });
    await user.save();
    if (roles) {
        const roles_ = await Role.find({
            name: { $in: roles }
        });
        if (!roles_) {
            res.status(500).send({ message: "Controller: Role not found, making user role" });
            const role = await Role.findOne({ name: "user" });
            user.roles = [role._id];
            await user.save();
            if (user)
                res.send({ message: "User was registered successfully!" });
        }
        else {
            user.roles = roles_.map(role => role._id);
            await user.save();
            if (user)
                res.send({ message: "User was registered successfully!" });
        }
    } else {
        const role = await Role.findOne({ name: "user" });
        user.roles = [role._id];

        await user.save();
        if (user)
            res.send({ message: "User was registered successfully!" });
    }
};

const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
        .populate("roles", "-__v");//THIS

    if (!user) {
        res.status(500).send({ message: 'Controller: User not found' });
        return;
    };
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
            expiresIn: 86400 // 24 hours before this token expires
        }
    );

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
    });
};

module.exports = {
    signIn,
    signUp,
}