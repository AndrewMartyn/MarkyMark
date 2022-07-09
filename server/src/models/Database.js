require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
// const url = 'mongodb+srv://HunterMCB:94OO81APQii0KtTy@markeymark.p2cjyug.mongodb.net/?retryWrites=true&w=majority';
// console.log("url: " + url);
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