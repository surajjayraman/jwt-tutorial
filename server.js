require('dotenv').config();

const express = require('express');
const app = express();
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
  },
  {
    username: "Awesome",
    title: "Awesome Day!"
  }

];

const orderInfo = {
  "orderNumber": "701099988",
  "clientProgramNumber": 993564408,
  "requestId": "7894561234564",
  "orderStatus": "Complete",
  "dateSubmitted": "2019-11-05T18:01:39.343+0000",
  "numberOfCards": 2,
  "totalCost": 100
}

// return the order information
app.get('/orderInfo', (req,res) => {
  res.json(orderInfo);
});

// return the posts
app.get('/posts', authenticateToken, (req,res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  // Bearer TOKEN
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);