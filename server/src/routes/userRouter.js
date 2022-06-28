const express = require('express');
const database = require('./models/Database');
database.connect();

const userRouter = express.Router();

userRouter.get('/login', async (req, res) => {
    const {loginEmail, password} = req.body;

    let error = '';
    let userID = -100;
    let firstName = '';
    let lastName = '';

    try {
        const db = database.mongoDB;
        const result = await db.collection('Users').findOne({Email:loginEmail, Password:password});

        if (result != null) {
            userID = result.UserID;
            firstName = result.FirstName;
            lastName = result.LastName;
        }
        else error = 'No Such Records';
    }
    catch(e) {
        error = "Login server error:\n" + e.toString();
    }

    let ret = {userID:userID, firstName:firstName, lastName:lastName, error:error};
    res.status(200).json(ret);
});

userRouter.post('/register', async (req, res) =>  {
    const {firstName, lastName, loginEmail, password} = req.body;

    let error = '';
    const newUser = {FirstName:firstName, LastName:lastName, Email:loginEmail, Password:password};

    try {
        const db = database.mongoDB;
        await db.collection('Users').insertOne(newUser);
    }
    catch (e) {
        error = "Register server error:\n" + e.toString();
    }

    res.status(200).json({error:error});
});

userRouter.post('/deleteUser', async (req, res) => {
    const {userID, loginEmail} = req.body;

    let error = '';
    const deleteMe = {UserID:userID, Email:loginEmail};

    try {
        const db = database.mongoDB;
        await db.collection('Users').findOneAndDelete(deleteMe);
    }
    catch (e) {
        error = "DeleteUser server error:\n" + e.toString();
    }

    res.status(200).json({error:error});
});

database.close();

module.exports = userRouter;