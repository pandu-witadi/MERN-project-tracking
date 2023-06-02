//
//
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')


const connectMongoDB = require('./db/mongodb-conn')
const CF = require('./config')


const app = express()

app.use( cors() )
app.use( logger('dev') )
app.use( express.json() )
app.use( express.urlencoded({ extended: true, limit: "50mb" }))


// Database Connection
mongoose.Promise = global.Promise
Promise.resolve(app)
    .then( connectMongoDB() )
    .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`))



// use: route
app.use('/api', require('./route/index') )

// for uploading
// app.use('/upload', express.static(path.join(__dirname, '..', 'upload')))

//these 3 lines make sure that Angular/VUe/React and express app are coming from the same server
const frontEndPath = path.join(__dirname, '..', CF.frontEnd.path)
console.log(frontEndPath)
app.use( express.static(frontEndPath) )
app.get(
    ['/'],
    function(req, res) {
        res.sendFile('index.html',  { root: frontEndPath } )
    }
)


module.exports = app
