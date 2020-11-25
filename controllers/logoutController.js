

// importing all the dependencies
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', 'appConfig', 'config'));

// defining the logout Controller
const logoutController = (req, res) => {
    try {
        // destroying the user session
        req.session.destroy ((error) => {

            // in case of any error, redirect them to home page so that they can again try to logout
            if (error) {
                return res.status (401).redirect ('/api/home');
            }

            // clearing the cookies
            res.clearCookie (config.CookieName);

            // redirecting the user to the login page after successfull logout
            return res.status (200).redirect ('/api/login');
        })
    }
    catch (error) {
        `
        <!doctype html>
        <html>
            <head>
                <title>Error</title>
                <meta charset='utf-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            </head>
            <body>
                Error ${error.message}
            </body>
        </html>
    `
    }
}

// exporting the logout Controller
module.exports = {
    logoutController
}