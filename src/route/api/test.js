//
//
const router = require('express').Router()

const { test_get } = require('../../module/test/testCon')

router.get('/', test_get)

module.exports = router
