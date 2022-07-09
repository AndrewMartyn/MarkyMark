const { ObjectId } = require('bson');
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    noteName: {
        type: String,
        required: true
    },
    notePath: {
        type: String,
        required: true
    },
    noteBody: {
        type: String,
        required: true
    },
    noteTags: {
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

module.exports = mongoose.model("Note", fileSchema)
