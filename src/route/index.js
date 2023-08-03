//
//
const router = require('express').Router()//


router.use('/test', require('./api/test'))
router.use('/auth', require('./api/auth'))
router.use('/project', require('./api/project'))
router.use('/activity', require('./api/activity'))
router.use('/message', require('./api/message'))
router.use('/note', require('./api/note'))


module.exports = router
