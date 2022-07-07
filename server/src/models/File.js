const mongoose = require('mongoose')

const fileSchema = new Schema({
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
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("File", fileSchema)
