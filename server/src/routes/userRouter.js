const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const database = require("../models/Database");
const User = require("../models/User");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
var moment = require("moment");

const userRouter = express.Router();
userRouter.use(cors());
userRouter.use(bodyParser.json());

const { sendVerificationEmail, sendResetEmail } = require("../nodemailer");
const { Console } = require("console");

database.connect();

// user logs in to account
userRouter.get("/users", async (req, res) => {
    const { email, password } = req.query;
    // console.log(loginEmail, password);

    let ret;
    let userId = -1;
    let firstName = "";
    let lastName = "";
    let tags = [];
    let verified = false;

    try {
        const db = database.mongoDB;
        const result = await db
            .collection("Users")
            .findOne({ email: email, password: password });

        if (result != null) {
            userId = result._id;
            firstName = result.firstName;
            lastName = result.lastName;
            tags = result.tags;
            verified = result.verified;

            if (verified) {
                try {
                    const token = require("../createJWT");
                    ret = token.createToken(userId, firstName, lastName, tags);
                } catch (e) {
                    ret = { error: "Token error: " + e.toString() };
                }
            } else ret = { error: "Email not verified." };
        } else ret = { error: "No Such Records" };
    } catch (e) {
        ret = { error: "Server error: " + e.toString() };
    }

    res.status(200).json(ret);
});

// user registers account
userRouter.post("/users", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let error;

    try {
        const db = database.mongoDB;

        // first validate that email is unique and does not already exist in database
        const result = await db.collection("Users").findOne({ email: email });

        if (result != null) {
            console.log("User already exists");
            res.status(300).json({ error: "User already exists" });
            return;
        } else {
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                dateCreated: undefined,
            });

            try {
                await db.collection("Users").insertOne(newUser, (err, d) => {
                    if (d.insertedId != null) {
                        console.log("User created");
                        // send email
                        sendVerificationEmail(firstName, email);
                    } else console.log("User could not be created");
                });
                error = "POST request sent";
            } catch (e) {
                error = "Server error: " + e.toString();
            }
        }
    } catch (e) {
        error = "Server error: " + e.toString();
    }

    res.status(200).json({ error: error });
});

// user deletes account
userRouter.delete("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { email } = req.body;

    let error;
    const deleteMe = { _id: new ObjectId(userId), email: email };

    try {
        const db = database.mongoDB;
        await db.collection("Users").deleteOne(deleteMe, (err, d) => {
            if (d.deletedCount === 1) console.log("User deleted");
            else console.log("User could not be deleted");
        });
        error = "DELETE request sent";
    } catch (e) {
        error = "Server error: " + e.toString();
    }

    res.status(200).json({ error: error });
});

// user requests email or password reset
userRouter.get("/users/requestreset", async (req, res) => {
    const { email, type } = req.query;

    let error = "";
    let userId = -1;
    let token = crypto.randomBytes(20).toString("hex");
    let expires = moment().add(24, "hours").toDate(); // token lasts 24 hours

    try {
        const db = database.mongoDB;
        const result = await db.collection("Users").findOne({ email: email });

        if (result != null) {
            userId = result._id;

            await db.collection("Users").updateOne(
                { email: email, _id: ObjectId(userId) },
                {
                    $set: {
                        resetToken: token,
                        resetTokenExpires: expires,
                    },
                }
            );
            sendResetEmail(email, userId, token, type);
            error = "";
        } else error = "No Such Records";
    } catch (e) {
        error = "Server error: " + e.toString();
    }

    res.status(200).json({ error: error });
});

// user email or password reset
userRouter.post("/users/reset", async (req, res) => {
    const { userId, token, type } = req.body;

    let error;
    let tokenExpires;
    let expired = true;

    try {
        const db = database.mongoDB;
        const result = await db
            .collection("Users")
            .findOne({ _id: ObjectId(userId), resetToken: token });

        if (result != null) {
            tokenExpires = moment(result.resetTokenExpires);
            expired = moment().diff(tokenExpires) > 0; // should work?

            if (!expired && type == "password") {
                await db
                    .collection("Users")
                    .updateOne(
                        { _id: ObjectId(userId) },
                        { $set: { password: req.body.newPassword } }
                    );
                error = { error: "" };
            } else if (!expired && type == "email") {
                await db
                    .collection("Users")
                    .updateOne(
                        { _id: ObjectId(userId) },
                        { $set: { email: req.body.newEmail } }
                    );
                error = { error: "" };
            } else error = { error: "Token Expired or Invalid Type" };
        } else error = { error: "No Such Records" };
    } catch (e) {
        error = { error: "Server error: " + e.toString() };
    }

    res.status(200).json(error);
});

// change firstname or lastname
userRouter.post("/users/changename", async (req, res) => {
    const { userId, newFirstName, newLastName } = req.body;

    try {
        const db = database.mongoDB;
        const result = await db
            .collection("Users")
            .find({ _id: ObjectId(userId) });

        if (result != null) {
            await db
                .collection("Users")
                .updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { firstName: newFirstName, lastName: newLastName } }
                );

            error = { error: "" };
        } else error = { error: "No Such Records" };
    } catch (e) {
        error = { error: "Server error: " + e.toString() };
    }

    res.status(200).json(error);
});

database.close();

module.exports = userRouter;
