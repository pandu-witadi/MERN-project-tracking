//
//
const router = require('express').Router()

const noteCon = require('../../module/note/noteCon')

router.get('/find-all/:projectId', noteCon.findAll)
router.post('/:projectId', noteCon.create)
router.delete('/:projectId/:id', noteCon.remove)
router.put('/:projectId/:id', noteCon.update)
router.put('/favorite/:projectId/:id', noteCon.updateFavorited)


module.exports = router
