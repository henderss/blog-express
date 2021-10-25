module.exports = (app) => {
	const express = require('express')
	const appRouter = express.Router()

	const authorsRoutes = require('./authors.routes')
	const postsRoutes = require('./posts.routes')

	appRouter.use('/authors', authorsRoutes)
	appRouter.use('/posts', postsRoutes)

	app.use('/', appRouter)
}