
// importing all the modules
const path = require ('path');
const _ = require ('lodash');
const { UserModel } = require (path.resolve (__dirname, '..', 'database', 'models', 'UserModel')); 
const { validateEmail, validateUsername, validatePassword } = require (path.resolve (__dirname, '..', 'validators', 'validator'));

// defining the registerUser Controller
const registerUserController = (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw new Error ('please enter all the details');
        }
        const { email, username, password } = _.pick (req.body, ['email', 'username', 'password']);

        // validate email, username, password
        if (!(validateEmail (email) && validateUsername (username) && validatePassword (password))) {
            throw new Error ('please enter the data in the correct format');
        }

        // finding the document having that email or username
        UserModel.findOne ({
            $or: [
                { email },
                { username }
            ]
        }).then ((foundDoc) => {
            if (foundDoc) {
                throw new Error ('User is already registered with this email or password !');
            }
            return UserModel.create ({
                email,
                password,
                username
            })
        }).then ((createdDoc) => {
            return res.status (200).redirect ('/api/login');
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
                            Error ${error.message}
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

// exporting the registerUser Controller
module.exports = {
    registerUserController
}