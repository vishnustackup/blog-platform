const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const blogcontroller = require('./blogcontroller')
const saltRounds = 10;
const getUser = async (req, res) => {

    res.render("register")
}




// --------------- REGISTER USER----------------//

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                msg: "User already exists"
            });
        }
        if (!username || !email || !password) {
            return res.status(401).json({
                msg: "enter correct details"
            });
        }

        // Hash the password
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();


        res.redirect('/login');
    } catch (err) {
        console.error("Failed to register user:", err);
        res.status(500).send("Failed to register user");
    }
};




// --------------- LOGIN USER----------------//

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        if (email === 'user' && password === 'pas') {
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(500).json({
                msg: "not found"
            })
        }
        if (!email || !password) {
            return res.status(401).json({
                msg: "enter correct details"
            });
        }
        const storedPassword = user.password
        const currentPassword = req.body.password
        const hashedPassword = await bcrypt.compare(currentPassword, storedPassword)


        if (!hashedPassword) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        //store user id in session

        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role
        }
        console.log("Session Data:", req.session);


        // Password matches, proceed with login
        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard')
        } else {
            res.redirect('/blog');
        }
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).send("Login failed");
    }

}



// --------------- LOGIN OUT----------------//


const logOut = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out");
        }
    })
    res.redirect('/login')
}

module.exports = { registerUser, getUser, loginUser, logOut }