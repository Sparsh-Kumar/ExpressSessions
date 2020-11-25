
// importing the dependencies
const express = require ('express');
const session = require ('express-session');
const path = require ('path');
const { routeHandler } = require (path.resolve (__dirname, 'routes', 'routeHandler'));
const { config } = require (path.resolve (__dirname, 'appConfig', 'config'));
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const helmet = require ('helmet');

const port = process.env.PORT || config.PORT;

// setting up mongoose to use promises
mongoose.Promise = global.Promise;

// establising the database connection for the storage
mongoose.connect (config.MongoDBURI).then (() => {
    console.log (`MongoDB = ${config.MongoDBURI}`);
}).catch ((error) => {
    console.log (`MongoDB Connection Error: ${error.message}`);
})

// making the express instance
const app = express ();

// making the app more secure by including appropriate headers in the request
app.use (helmet ());

// configuring the body-parser module
app.use (bodyParser.urlencoded ( { extended: true } ));

// we can call session as a middleware and passing it a config Object
app.use (session ({
    /*
        this will be the name of the cookie
    */
    name: config.CookieName,
    /*
        this option is for deciding if we should resave the session
        if the session is not modified
    */
    resave: false,

    // this will be the configuration of the actual session cookie
    // that needs to be stored in user's browser

    cookie: {
        /*
            max Age is the number of milliseconds after which the cookie will expire
            if this value is not set then in that case cookie will be the session cookie
        */
       maxAge: parseInt (config.CookieLifeTime),
       /*
            this is a defence against CSRF attacks
            in order to increase security of web application
            this will allow cookie to send only from the same site
            but we need to still implement csrf protection because some older browser don't still support
            this attribute, so they can be exploited using CSRF.
        */
       sameSite: true,
        /*
            secure attribute is true if https otherwise http
        */
        secure: config.isSecure
    },
    /*
        this is the option to decide if we should save the sessions that are uninitialized
        that means, the sessions are created but never modified during the request
    */
   saveUninitialized: false,
   secret: config.CookieSecret // this is the secret with which the cookie is encrypted
}))

// making the /api path
app.use ('/api', routeHandler);

// making the server listen on a specified port
app.listen (port, () => {
    console.log (`http://localhost:${config.PORT}`)
})