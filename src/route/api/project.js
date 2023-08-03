//
//
const router = require('express').Router()

const projectCon = require('../../module/project/projectCon')

router.post('/create', projectCon.create)
router.delete('/:projectId', projectCon.remove)
router.put('/:projectId', projectCon.update)

router.get('/search', projectCon.search)

router.get('/stat/all', projectCon.statAll)
router.get('/stat/:projectId', projectCon.statById)
router.get('/:projectId', projectCon.infoById)

module.exports = router
