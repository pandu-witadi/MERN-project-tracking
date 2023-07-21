//
//
const asyncHandler = require('express-async-handler')
const Message = require('./messageModel')

// -----------------------------------------------------------------------------
const findAll = asyncHandler( async (req, res) => {
    return res.status(200).json({ 'mode': 'findAll' })
})

const create = asyncHandler( async (req, res) => {
    return res.status(200).json({ 'mode': 'create' })
})

module.exports = {
    findAll,
    create
}
