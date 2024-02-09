// Importing the express module
const express = require("express");

// Importing the user_router module
const user_router = require("./routes/user_router");

// Creating a new instance of the express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Require and connect to the database
require("./config/db");

// Loading environment variables from .env file
require('dotenv').config();

// Extracting the port from environment variables
const port = process.env.PORT;

// Importing CORS middleware for handling Cross-Origin Resource Sharing
const cors = require("cors");

// Enabling CORS middleware
app.use(cors());

// Using the user_router for handling routes starting with "/api"
app.use("/api", user_router);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
