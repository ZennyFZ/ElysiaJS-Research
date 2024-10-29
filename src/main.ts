import { app } from "."

export default async function main(request: Request) {
  return app.fetch(request);
}