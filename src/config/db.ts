import mongoose from "mongoose";

const url = process.env.DATABASE_CONNECTION_URI as string

export const connect = async() => {
    try {
        const res = await mongoose.connect(url)
        console.log(`Connected to ${res.connection.host}`);
    } catch (err) {
        console.log(err)
    }
}