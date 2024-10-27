import Elysia from "elysia";
import { app } from './app'

export const server = new Elysia()
.use(app)