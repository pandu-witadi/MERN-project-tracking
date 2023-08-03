//
//
'use strict'
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const connectMongoDB = require('./db/mongodb-conn')
const { notFound, errorHandler } = require('./middleware/error')
const CF = require('./config')


const app = express()

app.use( cors() )
app.use( logger('dev') )
app.use( express.json() )
app.use( express.urlencoded({ extended: true, limit: "50mb" }))
app.use( fileUpload() )

// Database Connection
mongoose.Promise = global.Promise
Promise.resolve(app)
    .then( connectMongoDB() )
    .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`))


//these 3 lines make sure that Angular/VUe/React and express app are coming from the same server
const frontEndPath = path.join(__dirname, '..', CF.frontEnd.path)
console.log(frontEndPath)
app.use( express.static(frontEndPath) )

// for uploading
app.use('/upload', express.static(path.join(__dirname, '..', 'upload')))

// use: route
app.use('/api', require('./route/index') )

// serve client
app.get( ['/*'], function(req, res) {
        res.sendFile('index.html',  { root: frontEndPath } )
    }
)

app.use(notFound)
app.use(errorHandler)

module.exports = app
