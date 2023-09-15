import bodyParser from 'body-parser'
import 'colors'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import router from './app/news/news.routes.js'

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.json())

app.use('/api/news', router)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
	)
)
