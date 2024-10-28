import { Context, error } from "elysia"
import { SignInInterface } from "../common"

export const SignIn = async(context: Context) => {
    if (!context.body) return error(400, "Bad Request")
    const {email, password} = context.body as SignInInterface
    return `email: ${email}, password: ${password}`
}

export const SignUp = () => {
    return "SignUp"
}

export const SignOut = () => {
    return "SignOut"
}

export const RefreshToken = () => {
    return "RefreshToken"
}