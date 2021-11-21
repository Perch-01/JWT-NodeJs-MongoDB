module.exports = {
    env: 'development',// development, production
    database: {
        HOST: "localhost",
        PORT: 27017,
        DATABASE: "ugos_database",
        PASSWORD: "z7E4Vh4bqzB4ddmb",
        USER: "ugo",
        NAME: "myFirstDatabase",
    },
    auth: {
        jwtSecret: "ugos-top-secret-key",
    },
};
