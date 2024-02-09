// Importing the express module
const express = require("express");

// Creating a new router instance
const router = express.Router();

// Importing the signUp function from the user_controller module
const mySignup = require("../controllers/user_controller");

// Importing the login function from the user_controller module
const myLogin = require("../controllers/user_controller");

// Defining a route for handling POST requests to "/signup"
router.route("/signup").post(mySignup.signUp);

// Defining a route for handling POST requests to "/login"
router.route("/login").post(myLogin.login);

// Exporting the router to be used by other parts of the application
module.exports = router;
