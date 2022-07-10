const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const database = require('../models/Database');
const User = require('../models/User');
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(bodyParser.json());

database.connect();

// user logs in to account
userRouter.get('/users', async (req, res) => {
    const { email, password } = req.query
    // console.log(loginEmail, password);

    let ret;
    let userId = -1;
    let firstName = '';
    let lastName = '';
    let tags = [];

    try {
        const db = database.mongoDB;
        const result = await db.collection('Users').findOne({email: email, password: password});

        if (result != null) {
            userId = result._id;
            firstName = result.firstName;
            lastName = result.lastName;
            tags = result.tags;

            try {
                const token = require('../createJWT');
                ret = token.createToken(userId, firstName, lastName, tags);
            }
            catch (e) {
                ret = {error: "Token error: " + e.toString()};
            }
        }
        else ret = {error: 'No Such Records'};
    }
    catch(e) {
        ret = {error: "Server error: " + e.toString()};
    }

    res.status(200).json(ret);
});

// user registers account
userRouter.post('/users', async (req, res) =>  {
    const {firstName, lastName, email, password} = req.body;
    let error;

    try {
        const db = database.mongoDB;

        // first validate that email is unique and does not already exist in database
        const result = await db.collection('Users').findOne({email: email});

        if (result != null) {
            console.log("User already exists");
            res.status(300).json({error: "User already exists"});
            return;
        }
        else {
            const newUser = new User({firstName: firstName, lastName: lastName, email: email, password: password, dateCreated: undefined});

            try {
                await db.collection('Users').insertOne(newUser, (err, d) => {
                    if (d.insertedId != null) console.log("User created")
                    else console.log("User could not be created")
                });
                error = 'POST request sent';
            }
            catch (e) {
                error = "Server error: " + e.toString();
            }
        }
    }
    catch (e) {
        error = "Server error: " + e.toString();
    }

    res.status(200).json({error: error});
});

// user deletes account
userRouter.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const {email} = req.body;

    let error;
    const deleteMe = {_id: new ObjectId(userId), email: email};

    try {
        const db = database.mongoDB;
        await db.collection('Users').deleteOne(deleteMe, (err, d) => {
            if (d.deletedCount === 1) console.log("User deleted")
            else console.log("User could not be deleted")
        });
        error = 'DELETE request sent';
    }
    catch (e) {
        error = "Server error: " + e.toString();
    }

    res.status(200).json({error: error});
});

database.close();

module.exports = userRouter;
