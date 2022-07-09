require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
 console.log("url: " + url);
const client = new MongoClient(url); // url undefined for some reason

module.exports = {
    connect: () => {
        return client.connect();
        },
    close: () => {
        return client.close();
        },
    mongoDB: client.db('MarkyMark'), // Fill in DB name
}