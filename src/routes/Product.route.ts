import Elysia from "elysia";
import { PRODUCT_TAG } from "../config";
import { GetProduct, GetProductById } from "../service";

export const product = new Elysia({ prefix: "/product"})
.get("/", async () => {
    return GetProduct()
}, {
    detail: {
        tags: [PRODUCT_TAG]
    }
})

.get("/:id", ({ params: {id}}) => {
    return GetProductById(id)
}, {
    detail: {
        tags: [PRODUCT_TAG]
    }
})

