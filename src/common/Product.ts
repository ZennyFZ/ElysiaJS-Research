import { t } from "elysia";

export const productBody = t.Object({
    name: t.String(),
    status: t.Boolean(),
    image: t.String(),
    price: t.Number(),
    discountedPrice: t.Number(),
    description: t.String(),
    category: t.String(),
    numberOfSelling: t.Number(),
})

export type ProductInterface = typeof productBody.static