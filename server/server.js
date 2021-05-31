import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import chalk from 'chalk'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

mongoose.connection.on('connected', () => {
  console.log(chalk.bold.green('Mongoose has connected to Mongodb Atlas'))
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info(chalk.bold.blue(`Server has started and is listening to port ${config.port}`))
})
