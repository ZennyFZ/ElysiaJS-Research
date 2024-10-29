import { Elysia } from "elysia"
import { AUTH_TAG, jwtConfig } from "../config"
import { signInBody, signUpBody } from "../common"

export const auth = new Elysia({ prefix: "/auth" })
    .use(jwtConfig)

    .post("/sign-up", ({body}) => {

    }, {
        body: signUpBody,
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/sign-in", ({body}) => {
    }, {
        body: signInBody,
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/refresh", ({}), {
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .get("/sign-out", ({}), {
        detail: {
            tags: [AUTH_TAG]
        }
    })