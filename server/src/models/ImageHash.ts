import { Schema, model } from "mongoose";

const ImageHashSchema = new Schema({
    soure: {type: String, required: true},
    hash: {type: String, required: true},
});

export default model('ImageHash', ImageHashSchema);
