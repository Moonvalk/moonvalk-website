import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    password: {type: String, required: true},
    administrator: {type: Boolean, required: true},
});

export default model('User', UserSchema);
