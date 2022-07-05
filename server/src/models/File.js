const mongoose = require('mongoose')

const fileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("File", fileSchema)