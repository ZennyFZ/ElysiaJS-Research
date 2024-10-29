import mongoose from "mongoose"
import { SignUpInterface } from "../common"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
    }
})

export const User = mongoose.model<SignUpInterface>("users", UserSchema)