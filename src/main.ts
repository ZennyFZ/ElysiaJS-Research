import Elysia from "elysia";
import {app} from '.'

const main = new Elysia()
.mount('', app.fetch)