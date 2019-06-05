import { createServer } from 'http'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import { MongoClient } from 'mongodb'

import config from './config'
import jwt from './utils/jwt'
import index from './routes'

const app = express()
const server = createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

async function start() {
	const client = await MongoClient.connect(config.mongo.url, { useNewUrlParser: true })
	// app.client = client
	app.db = client.db()

	app.disable('x-powered-by')

	app.use(compression())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(cors())
	app.use(async (req, res, next) => {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			const token = req.headers.authorization.split(' ')[1]
			if (token) {
				req.user = await jwt.verify(token)
			}
		}
		next()
	})

  app.use('/', index);

	server.listen({ url: config.host, port: config.port }, () => {
		console.log(`🚀  Server ready at ${config.port}`)
	})
}

start().catch(err => {
	console.log(err)
})
