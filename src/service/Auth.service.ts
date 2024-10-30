import { Cookie, error } from "elysia"
import { SignInInterface, SignUpInterface } from "../common"
import { User } from "../models"
import { randomUUID } from "node:crypto"

export const SignIn = async (body: SignInInterface, cookie: Record<string, Cookie<string | undefined>>, accessJWTToken: Promise<string>, refreshJWTToken: Promise<string>) => {
    const {email, password} = body
    const {accessToken, refreshToken} = cookie

    const isUserFound = await User.findOne({email})
    if (!isUserFound) return error(401, "User does not exist")

    const isPasswordCorrect = await Bun.password.verify(password, isUserFound.password)
    if (!isPasswordCorrect) return error(401, "Incorrect password")

    accessToken.set({
        value: await accessJWTToken,
        httpOnly: true,
        secure: true,
        maxAge: 300
    })

    refreshToken.set({
        value: await refreshJWTToken,
        httpOnly: true,
        secure: true,
        maxAge: 2592000
    })

    const result = await isUserFound.updateOne({
        refreshToken
    })

    if (result) return "Sign in successfully"
    return error(500)
}

export const SignUp = async (body : SignUpInterface) => {
    const { email, password, username } = body
    if (!email || !password) return error(400)
    
    const duplicatedCheck = await User.findOne({email})
    if (duplicatedCheck != null) return error(409, "The email already exist")

    const hashPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 8
    })

    const newUser = new User({
        email,
        password: hashPassword,
        username: !username? `user ${randomUUID()}` : username,
        refreshToken: ""
    })

    const result = await newUser.save()
    if (result) return "Account created!"
    return error(500)
}

export const SignOut = async (cookie: Record<string, Cookie<string | undefined>>, email: string) => {
    const {accessToken, refreshToken} = cookie
    accessToken.remove()
    refreshToken.remove()
    const result = await User.findOneAndUpdate({
        email
    }, {
        refreshToken: ""
    })

    if (result) return "Sign out successfully"
    return error(500)
}

export const RefreshToken = async () => {
    return "test"
}