const express = require('express');

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
    res.send("login");
});

userRouter.get('/register', (req, res) =>  {
    res.send("register");
});


module.exports = userRouter;