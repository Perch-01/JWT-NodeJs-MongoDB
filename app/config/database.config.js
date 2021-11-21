const configuration = require('./config.config');
//THESE ARE PARAMS FOR SETTING UP THE MONGODB DATABASE
module.exports = {
    HOST: configuration.database.HOST,
    PORT: configuration.database.PORT,
    DATABASE: configuration.database.DATABASE,
};