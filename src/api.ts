import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { cors } from 'hono/cors'

const app = new Hono().basePath('/api')
app.use('/*', cors())

app.use(
	'/*',
	basicAuth({
		username: 'clinton',
		password: '1234',
	})
)

/**
 * Teste GET (root):

	fetch('/api/')
		.then(a => a.text())
		.then(a => console.log(a))
 */
app.get('/', c => c.text('Hello, Hono!'))

/**
 * Teste POST: 

	fetch('/api/hello', {
		method: 'POST',
				headers: new Headers({'content-type': 'application/json'}),
		body: JSON.stringify({name: "Roberto"})
	})
		.then(a => a.json())
		.then(a => console.log(a))
 */
app.post(
	'/hello',
	zValidator(
		'json',
		z.object({
			name: z.string(),
		})
	),
	(c) => {
		const { name } = c.req.valid('json')
		return c.json({
			message: `Hello, ${name}!`,
		})
	}
)

/**
 * Teste GET:

	fetch('/api/hello?name=Roberto')
		.then(a => a.json())
		.then(a => console.log(a))
 */
app.get(
	'/hello',
	zValidator(
		'query',
		z.object({
			name: z.string(),
		})
	),
	(c) => {
		const { name } = c.req.valid('query')
		return c.json({
			message: `Hello, ${name}!`,
		})
	}
)

export default app
