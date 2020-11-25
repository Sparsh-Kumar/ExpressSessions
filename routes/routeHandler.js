

// making the router Object
const routeHandler = require ('express').Router ();
const path = require ('path');
const { showloginController } = require (path.resolve (__dirname, '..', 'controllers', 'showloginController'));
const { showregisterController } = require (path.resolve (__dirname, '..', 'controllers', 'showregisterController'));
const { dashboardController } = require (path.resolve (__dirname, '..', 'controllers', 'dashboardController'));
const { homeController } = require (path.resolve (__dirname, '..', 'controllers', 'homeController'));
const { logoutController } = require (path.resolve (__dirname, '..', 'controllers', 'logoutController'));
const { registerUserController } = require (path.resolve (__dirname, '..', 'controllers', 'registerUserController'));
const { loginUserController } = require (path.resolve (__dirname, '..', 'controllers', 'loginUserController'));
const { checkLoggedIn, checknotLoggedIn } = require (path.resolve (__dirname, '..', 'middleware', 'checkloginmiddleware'));


// defining the various routes
routeHandler.get ('/home', homeController);
routeHandler.get ('/dashboard', checkLoggedIn, dashboardController); // It only makes sense to see dashboard if you are logged in
routeHandler.get ('/login', checknotLoggedIn, showloginController); // If user is already logged in, then redirect them to dashboard
routeHandler.post ('/login', checknotLoggedIn, loginUserController); // If user is already logged in, then redirect them to dashboard
routeHandler.get ('/register', checknotLoggedIn, showregisterController); // It only makes sense to show register form, if user is not logged in
routeHandler.post ('/register', checknotLoggedIn, registerUserController); // It only makes sense to perform registration, if user is not logged in
routeHandler.post ('/logout', checkLoggedIn, logoutController); // It only makes sense to logout if you are logged in


// exporting the router Object
module.exports = {
    routeHandler
}