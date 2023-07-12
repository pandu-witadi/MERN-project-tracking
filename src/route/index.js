//
//
const router = require('express').Router()//


router.use('/test', require('./api/test'))
router.use('/auth', require('./api/auth'))
router.use('/project', require('./api/project'))


module.exports = router
