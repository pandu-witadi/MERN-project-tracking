//
//
const router = require('express').Router()

const activityCon = require('../../module/activity/activityCon')

router.get('/find-all/:projectId', activityCon.findAll)
router.post('/:projectId', activityCon.create)
router.delete('/:projectId/:id', activityCon.remove)
router.put('/:projectId/:id', activityCon.update)


module.exports = router
