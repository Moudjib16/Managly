const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
const users = [
    { id: 1, username: 'John Doe' , password: 'password123' },
    { id: 2, username: 'Jane Doe' , password : 'password456' },
    { id: 3, username: 'Jim Doe' , password: 'password789' },
];


app.get('/', (req, res) => {
    res.send('Hello World');
    console.log(users);
})

app.post('/api/signup', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send('Request body is required');
        }
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username and password are required');
        }
        if (req.body.password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { id : Date.now(), username: req.body.username, password: hashedPassword};
        users.push(user);
        console.log('User signed up:', user);
        res.status(201).send('User signed up');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error');
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});