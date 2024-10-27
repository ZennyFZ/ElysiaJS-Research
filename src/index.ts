import { Elysia, redirect } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { user, note } from './route'
import staticPlugin from '@elysiajs/static'

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'Scalar: Modern Swagger UI',
        version: '1.0.0'
      },
      tags: [
        { name: 'USER', description: 'USER endpoints' },
        { name: 'NOTE', description: 'NOTE endpoints' }
      ],
    },
    exclude: ['/'],
    autoDarkMode: true,
  }))
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :('

    console.error(error)
  })
  .get('/', redirect('/swagger'))
  .use(user)
  .use(note)
  .use(staticPlugin())
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);