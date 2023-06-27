import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {type: String, required: true, unique: true},
    subtitle: {type: String},
    date: {type: String, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true},
    summary: {type: String, required: true},
    content: String,
    coverFile: String,
    author: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
}, {
    timestamps: true,
});

export default model('Post', PostSchema);
