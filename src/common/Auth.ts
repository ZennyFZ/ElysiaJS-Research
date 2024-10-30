import { t } from "elysia"

export const signInBody = t.Object({
    email: t.String(),
    password: t.String({minLength: 8}),
    isRemember: t.Boolean(),
})

export type SignInInterface = typeof signInBody.static

export const signUpBody = t.Object({
    email: t.String(),
    password: t.String({minLength: 8}),
    username: t.String()
})

export type SignUpInterface  = typeof signUpBody.static