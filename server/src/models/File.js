import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const fileSchema = new Schema({
    fileName: {
        type: String,
        required: true, 
    },
    filePath: {
        type: String,
        required: true,
    }
});