// backend/models/index.js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    usermail: {type: String, required: true},
    userphone: {type: String, required: true},
    userdate: {type: String, required: true},
    usergender: {type: String, required: true},
    usertype: {type: String, required: true},
    userdetail: {type: String, required: true},
    userimage: {type: Buffer, required: true},
})
export const Users = mongoose.model("Users",UserSchema);