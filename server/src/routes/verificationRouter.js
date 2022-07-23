const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const database = require("../models/Database");
const User = require("../models/User");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const verificationRouter = express.Router();
verificationRouter.use(cors());
verificationRouter.use(bodyParser.json());

database.connect();

verificationRouter.get("/verification", async (req, res) => {
    const { email } = req.query;

    let ret;
    let verified = false;

    try {
        const db = database.mongoDB;
        const result = await db.collection("Users").findOne({ email: email });
        if (result != null) {
            verified = result.verified;
            if (!verified) {
                await db
                    .collection("Users")
                    .updateOne({ email: email }, { $set: { verified: true } });

                verified = true;
                ret = `<meta http-equiv="Refresh" content="5; url='http://localhost:3000/" />Success!<br>Redirecting in 5 seconds...<br><br>or click <a href="http://localhost:3000">here</a> to be redirected immediately.`;
            } else
                ret = `<meta http-equiv="Refresh" content="5; url='http://localhost:3000/" />Success!<br>Redirecting in 5 seconds...<br>or click <a href="http://localhost:3000">here</a> to be redirected immediately.`;
        } else
            ret = `<meta http-equiv="Refresh" content="10; url='http://localhost:3000/" />Uh oh! Something went wrong :(<br>Redirecting in 10 seconds...<br>or click <a href="http://localhost:3000">here</a> to be redirected immediately.`;
    } catch (e) {
        ret = "Server error: " + e.toString();
    }

    res.status(200).send(ret);
});

database.close();

module.exports = verificationRouter;
