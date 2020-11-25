
// importing the modules
const path = require ('path');
const _ = require ('lodash');
const { UserModel } = require (path.resolve (__dirname, '..', 'database', 'models', 'UserModel'));
const { validateEmail, validatePassword, validateUsername } = require (path.resolve (__dirname, '..', 'validators', 'validator'));

// defining the login User Controller
const loginUserController = (req, res) => {
    try {

        // check for all parameters
        if (!req.body.email || !req.body.password) {
            throw new Error ('please pass all the required parameters');
        }

        // get all the values from the request Object
        const { email, password} = _.pick (req.body, ['email', 'password']);

        // check for validity
        if (!(validateEmail (email) && validatePassword (password))) {
            throw new Error ('please enter the data in the correct format');
        }
        
        let foundUser = undefined;

        // find the Document having these values
        UserModel.findOne ({
            email
        }).then ((foundDoc) => {
            if (!foundDoc) {
                throw new Error ('user with the following credentials are not found');
            }
            
            foundUser = foundDoc;
            return UserModel.comparePassword (password, foundDoc.password)
            // logic for session store
            //req.session.userId = foundDoc._id;

            // redirect to dashboard Route
            //return res.status (200).redirect ('/api/dashboard');

        }).then ((isvalidPassword) => {
            if (isvalidPassword === false) {
                throw new Error ('password entered is not a valid password');
            }

            // logic for session store
            req.session.userId = foundUser._id;

            // redirect to dashboard Route
            return res.status (200).redirect ('/api/dashboard');

        }).catch ((error) => {
            return res.status (400).send (
                `
                    <!doctype html>
                    <html>
                        <head>
                            <title>Error</title>
                            <meta charset='utf-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                        </head>
                        <body>
                            Error: ${error.message}
                        </body>
                    </html>
                `
            )
        })
    }
    catch (error) {
        return res.status (400).send (
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
    }
}

// exporting the loginUser Controller
module.exports = {
    loginUserController
}