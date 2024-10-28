import { Elysia, t } from "elysia"
import { RefreshToken, SignIn, SignOut, SignUp } from "../controllers"
import { AUTH_TAG } from "../config"

export const auth = new Elysia({ prefix: "/auth" })
    .model({
        signUp: t.Object({
            username: t.String({ minLength: 5 }),
            email: t.String(),
            password: t.String({ minLength: 8 })
        }),

        signIn: t.Object({
            email: t.String(),
            password: t.String({ minLength: 8 })
        }),
    })

    .post("/sign-up", SignUp, {
        body: "signUp",
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/sign-in", SignIn, {
        body: "signIn",
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/refresh", RefreshToken, {
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .get("/sign-out", SignOut, {
        detail: {
            tags: [AUTH_TAG]
        }
    })