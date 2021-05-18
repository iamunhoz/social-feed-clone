import app from './express'
import chalk from 'chalk'
import config from './../config/config'
import devBundle from './devBundle.js'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import template from './../template.js'


mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, 
                { useNewUrlParser: true,
                  useCreateIndex: true,
                  useUnifiedTopology: true }) 

mongoose.connection.on('connected', () => {
    console.log(chalk.bold.green('Mongoose has connected to Mongodb Atlas'))
 })

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to db: ${config.mongoUri}`)
})


devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.get('/', (req, res) => { 
    res.status(200).send(template()) 
})

app.listen(config.port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info(chalk.bold.blue(`Server has started and is listening to port ${config.port}`))
})    


