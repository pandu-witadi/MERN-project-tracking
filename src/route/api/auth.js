//
//
const router = require('express').Router()

const authCon = require('../../module/user/authCon')

router.post('/register', authCon.register)
router.post('/login', authCon.login)
router.put('/update', authCon.authRequired, authCon.update)


module.exports = router
