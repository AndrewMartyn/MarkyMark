const { ObjectId } = require('bson');
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileBody: {
        type: String,
        required: true
    },
    fileTags: {
        type: [String]
    },
    dateLastModified: {
        type: Date,
        default: Date.now()
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("File", fileSchema)
