

// importing the dependencies
const validator = require ('validator');
const passwordValidator = require ('password-validator');


// defining the password Schema
const passwordSchema = new passwordValidator ();
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


// email validation function
const validateEmail = (email = undefined) => {
    if (!email) {
        return false;
    }
    return validator.isEmail (email);
}


// username validation function 
const validateUsername = (username = undefined) => {
    if (!username) {
        return false;
    }
    return ((!validator.isEmpty (username)) && (validator.isAlphanumeric (username)));
}


// password validation function
const validatePassword = (password = undefined) => {
    if (!password) {
        return false;
    }
    return passwordSchema.validate (password);
}

// exporting the validation functions
module.exports = {
    validateEmail,
    validateUsername,
    validatePassword
}