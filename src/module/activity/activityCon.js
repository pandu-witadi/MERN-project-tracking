//
//
var mongoose = require('mongoose')

const asyncHandler = require('express-async-handler')
const Activity = require('./activityModel')

// -----------------------------------------------------------------------------
const findAll = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    try {
        const listActivity = await Activity.find({projectId: projectId}).sort({'createdAt': -1})
        return res.status(200).json(listActivity)
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

    const { title, ...otherKeys } = req.body
    if (!title) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const objExist = await Activity.findOne({ projectId: projectId, title: title })
    if (objExist) {
        res.status(401)
        throw new Error('title already registered')
    }

    try {
        let activityData = { projectId, ...req.body }
        const activity = await Activity.create(activityData)
        return res.status(200).json(activity)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

const remove = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    const id  = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('activity id not found')
    }

    const activity = await Activity.findOneAndDelete({ projectId: projectId, _id: id})
    if (!activity) {
        res.status(404)
        throw new Error('Activity not found')
    }
    return res.status(200).json(activity)
})

const update = asyncHandler( async (req, res) => {
    const tProjectId  = req.params.projectId
    if (!tProjectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    const id  = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('activity id not found')
    }
    try {
        const { _id, __v, createdAt, updatedAt, projectId, ...otherKeys} = req.body
        const activity = await Activity.findOneAndUpdate(
            { projectId: tProjectId, _id: id},
            otherKeys,
            { new: true }
        )
        // console.log(activity)
        if (!activity) {
            res.status(404)
            throw new Error('activity not found')
        }
        return res.status(200).json(activity)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

module.exports = {
    findAll,
    create,
    remove,
    update
}
