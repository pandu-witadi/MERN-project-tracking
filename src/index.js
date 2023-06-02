//
//
'use strict'
const http = require('http')

const CF = require('./config')
const app = require('./app')

const server = http.createServer(app)


app.set('PORT_NUMBER', CF.server.port)

//  Start the app on the specific interface (and port).
server.listen(CF.server.port, () => {
    const curDate = new Date()
    console.log('|--------------------------------------------')
    console.log('| Server      : ' + CF.app.name)
    console.log('| Environment : ' + CF.server.ENV)
    console.log('| Port        : ' + CF.server.port)
    console.log('| Date        : ' + curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate() )
    console.log('| Local Time  : ' + curDate.toLocaleTimeString() )
    console.log('|--------------------------------------------')
    console.log('| Waiting For Database Connection ')
})

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0)
    })
})

module.exports = server
