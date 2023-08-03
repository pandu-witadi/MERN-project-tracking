//
//
const router = require('express').Router()

const messageCon = require('../../module/message/messageCon')

router.get('/find-all/:projectId/:activityId', messageCon.findAll)
router.post('/:projectId/:activityId', messageCon.create)


module.exports = router
