module.exports = {
    env: 'development',// development, production
    database: {
        HOST: "localhost",
        PORT: 27017,
        DATABASE: "ugos_database",
    },
    auth: {
        jwtSecret: "ugos-top-secret-key",
    },
};
