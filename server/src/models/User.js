import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {

    }
    email: {

    }
    password: {

    }
})