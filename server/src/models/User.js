const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    // array of strings to store all the tags used by a particular user for easier filtered search
    tags: {
        type: [String],
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    verified:{
        type: Boolean,
        required: true,
    }

});

module.exports = mongoose.model("User", userSchema)
