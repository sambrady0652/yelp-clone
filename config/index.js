module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: Number.parseInt(process.env.PORT, 10) || 8081,
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    // - Not implemented currently
    yelpFusionConfig: {
        clientKey: process.env.YELP_CLIENT_ID,
        apiKey: process.env.YELP_API_KEY,
    },
    MapsSecretKey: {
        MAPS_SECRET_KEY: process.env.MAPS_SECRET_KEY
    },
    awsKeys: {
        AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY
    }
};
