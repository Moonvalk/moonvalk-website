import { Schema, model } from "mongoose";

const ChangelogSchema = new Schema({
    version: String,
    date: String,
    summary: String,
}, {
    timestamps: true,
});

export default model('Changelog', ChangelogSchema);
