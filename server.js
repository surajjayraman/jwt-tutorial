require('dotenv').config();

const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: "Suraj",
        title: "Post1"
    },
    {
        username: "Nair",
        title: "Post 2"
    }

]

// return the posts
app.get('/posts', authenticateToken, (req,res) => {
    
    res.json(posts.filter(post => post.username === req.user.name));
})

app.post('/login', (req, res) => {
    // Authenticate User
    // serialize user object with JWT using secret key
    const username = req.body.username;  
    const user = { name: username};

    //require('crypto').randomBytes(64).toString('hex')
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken})

})

function authenticateToken(req, res, next){
    // Bearer TOKEN
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000);