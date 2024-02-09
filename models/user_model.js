// const mongoose = require("../config/db")
// we can import db.js file here for generally i m importing it in server.js(entry file)
const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profileImg: {
        type: String,
        default: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D"
    }
})


// Exporting the mongoose model for the User collection
module.exports = mongoose.model("User", userSchema)