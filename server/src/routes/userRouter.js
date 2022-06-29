const express = require('express');
const database = require('./models/Database');
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(bodyParser.json());

database.connect();

// user logs in to account
userRouter.get('/users', async (req, res) => {
    const {loginEmail, password} = req.body;

    let error;
    let userId = -1;
    let firstName = '';
    let lastName = '';
    let tags = [];

    try {
        const db = database.mongoDB;
        const result = await db.collection('Users').findOne({Email: loginEmail, Password: password});

        if (result != null) {
            userId = result.UserID;
            firstName = result.FirstName;
            lastName = result.LastName;
            tags = result.Tags;
            error = 'User found';
        }
        else error = 'No Such Records';
    }
    catch(e) {
        error = "Server error:\n" + e.toString();
    }

    let ret = {userId: userId, firstName: firstName, lastName: lastName, tags: tags, error: error};
    res.status(200).json(ret);
});

// user registers account
userRouter.post('/users', async (req, res) =>  {
    const {firstName, lastName, loginEmail, password} = req.body;

    let error;
    const newUser = {FirstName: firstName, LastName: lastName, Email: loginEmail, Password: password};

    try {
        const db = database.mongoDB;
        await db.collection('Users').insertOne(newUser);
        error = 'User created';
    }
    catch (e) {
        error = "Server error:\n" + e.toString();
    }

    res.status(200).json({error: error});
});

// user deletes account
userRouter.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const {loginEmail} = req.body;

    let error;
    const deleteMe = {UserID: userId, Email: loginEmail};

    try {
        const db = database.mongoDB;
        await db.collection('Users').findOneAndDelete(deleteMe);
        error = 'User deleted';
    }
    catch (e) {
        error = "Server error:\n" + e.toString();
    }

    res.status(200).json({error: error});
});

database.close();

module.exports = userRouter;