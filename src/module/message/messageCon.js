//
//
const asyncHandler = require('express-async-handler')
const Message = require('./messageModel')

// -----------------------------------------------------------------------------
const findAll = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }
    const activityId  = req.params.activityId
    if (!activityId) {
        res.status(400)
        throw new Error('activity id not found')
    }
    try {
        const listMessage = await Message.find({
            projectId: projectId,
            activityId: activityId,
        }).sort({'createdAt': 1}).populate('creatorId')
        return res.status(200).json(listMessage)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

const create = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }
    const activityId  = req.params.activityId
    if (!activityId) {
        res.status(400)
        throw new Error('activity id not found')
    }

    try {
        let mesageData = { projectId, activityId, ...req.body }
        const message = await Message.create(mesageData)
        return res.status(200).json(message)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

module.exports = {
    findAll,
    create
}
