const MongoClient = require('mongodb').MongoClient;
const url = ''; // Fill in MongoDB server url
const client = new MongoClient(url);

module.exports = {
    connect: () => {
        return client.connect();
        },
    close: () => {
        return client.close();
        },
    mongoDB: client.db(''), // Fill in DB name
};