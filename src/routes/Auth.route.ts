import { randomUUID } from 'node:crypto';
import { Elysia, error } from "elysia"
import { AUTH_TAG, jwtConfig } from "../config"
import { signInBody, signUpBody } from "../common"
import { GetProfile, RefreshToken, SignIn, SignOut, SignUp } from "../service"
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
            exp: 300,
            iat: Math.floor(Date.now() / 1000),
            jti: randomUUID()
        })
        const refreshJWTToken = jwt.sign({
            sub: body.email,
            exp: 2592000,
            iat: Math.floor(Date.now() / 1000)+2592000,
            jti: randomUUID()
        })
        return SignIn(body, cookie, accessJWTToken, refreshJWTToken)
    }, {
        body: signInBody,
        detail: {
            tags: [AUTH_TAG]
        }
    })

    .post("/refresh", async ({cookie, jwt}) => {
        const {accessToken, refreshToken} = cookie
        const accessTokenPayload = await jwt.verify(accessToken.toString()) as JWTPayloadSpec
        const refreshTokenPayload = await jwt.verify(refreshToken.toString()) as JWTPayloadSpec

        if (Math.floor(Date.now() / 1000) === refreshTokenPayload.iat) return error(401, "Credential expired, please login again")

        const accessJWTToken = jwt.sign({
            sub: accessTokenPayload.sub as string,
            exp: 300,
            iat: Math.floor(Date.now() / 1000),
            jti: randomUUID()
        })
        const refreshJWTToken = jwt.sign({
            sub: refreshTokenPayload.sub as string,
            exp: 2592000,
            iat: refreshTokenPayload.iat as number,
            jti: randomUUID()
        })
        return RefreshToken(cookie, accessJWTToken, refreshJWTToken, accessTokenPayload.sub as string)
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

    .get("/me", async ({cookie, jwt}) => {
        const {accessToken} = cookie
        const accessTokenPayload = await jwt.verify(accessToken.toString()) as JWTPayloadSpec
        return GetProfile(accessTokenPayload.sub as string)
    }, {
        detail: {
            tags: [AUTH_TAG]
        }
    })