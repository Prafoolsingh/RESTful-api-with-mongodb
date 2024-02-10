const User = require("../models/user_model")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

require("dotenv").config()

const signUp = async (req, res) => {
    try {
        const { fullName, email, password, profileImg } = req.body;

        // loguc fullName,email and password should not empty
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "one or more mandatory fields are empty" })
        }

        // logic for checking email if already present  or not
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" })
        }

        // Hashing the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating a new user instance
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            profileImg: profileImg
        })

        // saving the new user to the database
        await newUser.save()

        // Return success response
        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {

        // Handle any errors
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // email and password both are mandatory
        if (!email || !password) {
            res.status(404).json({ error: "one or more mandatory fields are empty" })
        }


        const existingUser = await User.findOne({ email: email })

        // if user email does'nt found
        if (!existingUser) {
            return res.status(401).json({ error: "invalid credentials" })
        }

        // if user email is found then we have to comapare the password (which we will get from req.body) with the encrpted password stored in our database

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);



        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        else {

            //  generating a json token for authentication

            const payload = {
                _id: existingUser._id
            };

            const secretKey = process.env.SECRET_KEY

            const token = jwt.sign(payload, secretKey);

            const userInfo = { "email": existingUser.email, "fullname": existingUser.fullName }

            res.status(200).json({ token: token, user: userInfo, message: "jwt token generated  and user logged in successfully" });
        }

    } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

// Exporting the signUp and login functions
module.exports = { signUp, login }