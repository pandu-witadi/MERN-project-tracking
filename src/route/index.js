//
//
const router = require('express').Router()//


router.use('/test', require('./api/test'))

router.use('/auth', require('./api/auth'))


module.exports = router
