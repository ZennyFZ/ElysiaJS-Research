import { Elysia } from "elysia"
import { AUTH_TAG, jwtConfig } from "../config"
import { signInBody, signUpBody } from "../common"
import { RefreshToken, SignIn, SignOut, SignUp } from "../service"
import { JWTPayloadSpec } from "@elysiajs/jwt"

export const auth = new Elysia({ prefix: "/auth" })
    .use(jwtConfig)
    .post("/sign-up", ({body}) => {
        return SignUp(body)
    }, {
        body: signUpBody,
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/sign-in", async ({body, cookie, jwt}) => {
        const accessJWTToken = jwt.sign({
            sub: body.email,
            exp: 300
        })
        const refreshJWTToken = jwt.sign({
            sub: body.email,
            exp: 2592000
        })
        return SignIn(body, cookie, accessJWTToken, refreshJWTToken)
    }, {
        body: signInBody,
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/refresh", ({cookie, jwt}) => {
        return RefreshToken()
    }, {
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .get("/sign-out", async ({cookie, jwt}) => {
        const {accessToken} = cookie
        const result = await jwt.verify(accessToken.toString()) as JWTPayloadSpec
        return SignOut(cookie, result.sub as string)
    }, {
        detail: {
            tags: [AUTH_TAG]
        }
    })