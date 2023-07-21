//
//
const router = require('express').Router()

const messageCon = require('../../module/message/messageCon')

router.get('/findAll', messageCon.findAll)
router.get('/create', messageCon.create)


module.exports = router
