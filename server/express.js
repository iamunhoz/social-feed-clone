import express from 'express'
import { urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import authErrorHandler from './helpers/authErrorHandler'

// Server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import theme from './../client/theme'
import template from './../template'

// only for development stage
import devBundle from './devBundle'

const app = express()

// only for development stage
devBundle.compile(app)

// middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('*', (req, res) => {
	const sheets = new ServerStyleSheets()
	const context = {}
	const markup = ReactDOMServer.renderToString(
		sheets.collect(
			<StaticRouter location={req.url} context={context}>
				<ThemeProvider theme={theme}>
					<MainRouter />
				</ThemeProvider>
			</StaticRouter>
		)
	)
	if (context.url) {
		return res.redirect(303, context.url)
	}
	const css = sheets.toString()
	res.status(200).send(template({
		markup: markup,
		css: css
	}))
})

app.use(authErrorHandler)

export default app
