const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const database = require('../models/Database');
const User = require('../models/User');
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer')
const {v4: uuidv4} = require('uuid')
require('dotenv').config()
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})


const verificationRouter = express.Router()
verificationRouter.use(cors())
verificationRouter.use(bodyParser.json())

database.connect()

transporter.verify((error,success) => {
    if(error){
        console.log(error)
    }else{
        console.log("Ready for messages")
        console.log("success")
    }
})




database.close()

module.exports = verificationRouter