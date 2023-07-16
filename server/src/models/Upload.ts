import { Schema, model } from "mongoose";

const UploadSchema = new Schema({
    source: {type: String, required: true},
    name: {type: String, required: true},
    hash: {type: String, required: false},
    type: {type: String, required: false},
    aspectRatio: {type: Number, required: true},
}, {
    timestamps: true,
});

export default model('Upload', UploadSchema);
