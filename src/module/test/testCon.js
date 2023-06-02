//
//
const CF = require('../../config')


const test_get = async (req, res) => {
    try {
        curDate = new Date()
        return res.send({
            appName: CF.app.name,
            port: CF.server.port,
            appVersion: CF.app.version,
            serverDate: curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(),
            serverTime: curDate.toLocaleTimeString(),
            random: Math.random()
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}


module.exports = { test_get }
