//
//
const router = require('express').Router()

const projectCon = require('../../module/project/projectCon')

router.post('/create', projectCon.create)
router.delete('/:id', projectCon.remove)
router.put('/:id', projectCon.update)
// router.get('/find', projectCon.findProject)
router.get('/search', projectCon.search)
router.get('/stat', projectCon.statProject)
router.get('/:id', projectCon.infoById)

module.exports = router
