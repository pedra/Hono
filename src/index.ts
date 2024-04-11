import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import Api from './api'

const app = new Hono()

app.use('/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

app.route('/', Api)

app.get(
	'/*',
	serveStatic({
		onNotFound: (path, c) => {
			console.log(`${path} is not found, you access ${c.req.path}`)
		},
	})
)

export default app
