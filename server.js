// Importing the express module
const express = require("express");

const auth=require("./midlleware/middleware_auth")

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


// this endpoint can be accessed by only genuine user beacuase we have used auth middleware which is check for genuine user if it is then middleware direct that user to this endpoint otherwise will not allow
app.get("/secret",auth,(req,res)=>{
res.send("now you can access me")
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
