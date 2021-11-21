const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//This is our entire database
const database = {};
database.mongoose = mongoose;
database.user = require("./user.model");
database.role = require("./role.model");

//Declare the type of roles
database.ROLES = ["user", "admin", "moderator"];

module.exports = database;