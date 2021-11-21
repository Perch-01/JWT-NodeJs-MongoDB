const configuration = require('./config.config');
module.exports = {
    secret: configuration.auth.jwtSecret,
};