import { Product } from "../models"

export const GetProduct = async () => {
    return Product.find({})
}

export const GetProductById = async (id: string) => {
    return Product.findById(id)
}