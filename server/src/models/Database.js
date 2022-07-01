require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

module.exports = {
    connect: () => {
        return client.connect();
        },
    close: () => {
        return client.close();
        },
    mongoDB: client.db('MarkyMark'), // Fill in DB name
}