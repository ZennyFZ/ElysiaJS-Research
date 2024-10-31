import { ProductInterface } from './../common';
import mongoose from "mongoose"
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discountedPrice: {
        type: Number
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
    }
})

export const Product = mongoose.model<ProductInterface>("products", ProductSchema)