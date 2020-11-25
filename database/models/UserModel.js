

// importing the dependencies
const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
const _ = require ('lodash');
const bcrypt = require ('bcrypt');
const path = require ('path');
const { config } = require (path.resolve (__dirname, '..', '..', 'appConfig', 'config'));
const { validateEmail, validatePassword, validateUsername } = require (path.resolve (__dirname, '..', '..', 'validators', 'validator'))

// defining the user Schema
const UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (email) => {
                return validateEmail (email)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (password) => {
                return validatePassword (password)
            },
            message: '{VALUE} is not a valid password'
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (username) => {
                return validateUsername (username)
            },
            message: '{VALUE} is not a valid username'
        }
    }
}, { timestamps: true });

// uniqueValidator plugin
UserSchema.plugin (uniqueValidator);

// making a function to hash the password before saving to the database
UserSchema.pre ('save', function (next) {
    let user = this;
    bcrypt.hash (user.password, config.SaltRounds, (error, hash) => {
        if (error) {
            return next (error);
        }
        else {
            user.password = hash;
            next ();
        }
    })
})

// making a static function to compare hashed passwords
UserSchema.statics.comparePassword = function (plainTextPassword, hashedPassword) {
    return bcrypt.compare (plainTextPassword, hashedPassword); // it returns a promise
}

// defining the model
const UserModel = mongoose.model ('user', UserSchema);

// exporting the model
module.exports = {
    UserModel
}