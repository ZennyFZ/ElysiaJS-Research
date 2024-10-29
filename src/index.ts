import { Elysia, redirect } from "elysia"
import { swagger } from "@elysiajs/swagger"
import { auth } from "./routes"
import * as db from "./config"
import staticPlugin from "@elysiajs/static"
import cors from "@elysiajs/cors"

const PORT = 3000

db.connect()

const app = new Elysia({aot: false})
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Scalar: Modern Swagger UI",
        version: "1.0.0"
      },
      tags: [
        { name: "AUTH", description: "AUTH endpoints" },
      ],
    },
    exclude: ["/"],
    autoDarkMode: true,
  }))
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") return "Not Found :("

    console.error(error)
  })
  .get("/", redirect("/swagger"))
  .use(auth)
  .use(staticPlugin())
  .listen(PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);