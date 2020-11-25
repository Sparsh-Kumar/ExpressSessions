

// making the config Object
const config = {
    PORT: 8000,
    CookieLifeTime: 60000,  // 1 minute value
    isSecure: false,
    CookieName: 'mycookie',
    CookieSecret: 'this is the cookie secret',
    MongoDBURI: 'your MongoDB URI',
    SaltRounds: 4
}

// exporting the config Object
module.exports = {
    config
}