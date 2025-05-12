const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const bcrypt = require('bcrypt');
const users = [];



const getLandingPage =  async (req, res) => {
    res.send('Welcome to the landing page');
};





const createUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is required');
    }
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, password: hashedPassword };
    users.push(user);

    console.log('User signed up:', user);
    res.status(201).send('User signed up');
}





const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is required');
    }
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(400).send('Invalid username or password');
    }

    res.send('Login successful');
}

module.exports = {
    getLandingPage,
    createUser,
    loginUser
}