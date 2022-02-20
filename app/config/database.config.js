const configuration = require('./config.config');
//THESE ARE PARAMS FOR SETTING UP THE MONGODB DATABASE, Cluster0
module.exports = {
    HOST: configuration.database.HOST,
    PORT: configuration.database.PORT,
    DATABASE: configuration.database.DATABASE,
    PASSWORD: configuration.database.PASSWORD,
    USER: configuration.database.USER,
    NAME: configuration.database.NAME,
};