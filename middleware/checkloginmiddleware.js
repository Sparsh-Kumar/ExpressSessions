
// importing all the dependencies
const path = require ('path');
const { UserModel } = require (path.resolve (__dirname, '..', 'database', 'models', 'UserModel'));

// defining the checklogin function
const checkLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.status (200).redirect ('/api/login');
    }
    else {
        UserModel.findOne  ({
            _id: req.session.userId
        }).then ((foundDoc) => {
            if (!foundDoc) {
                throw new Error ('no user found with the given Id');
            }
            req.user = foundDoc;
            next ();
        }).catch ((error) => {
            return res.status (401).send (
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
            )
        })
    }
}

// defining the checkednotloggedin function
const checknotLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        return res.status (200).redirect ('/api/dashboard');
    }
    else {
        next ();
    }
}

// exporting the middleware function
module.exports = {
    checkLoggedIn,
    checknotLoggedIn
}