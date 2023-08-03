//
//
const asyncHandler = require('express-async-handler')
const Note = require('./noteModel')

// -----------------------------------------------------------------------------
const findAll = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    try {
        const listNote = await Note.find({ projectId: projectId }).sort({'createdAt': 1}).populate('creatorId')
        return res.status(200).json(listNote)
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

    try {
        let noteData = { projectId, ...req.body }
        console.log(noteData)
        const note = await Note.create(noteData)
        return res.status(200).json(note)
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

    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('note id not found')
    }

    const note = await Note.findOneAndDelete({ projectId: projectId, _id: id})
    if (!note) {
        res.status(404)
        throw new Error('Note not found')
    }
    return res.status(200).json(note)
})

const update = asyncHandler( async (req, res) => {
    const tProjectId  = req.params.projectId
    if (!tProjectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('note id not found')
    }
    try {
        const { _id, __v, createdAt, updatedAt, projectId, ...otherKeys} = req.body
        const note = await Note.findOneAndUpdate(
            { projectId: tProjectId, _id: id},
            otherKeys,
            { new: true }
        )
        // console.log(activity)
        if (!note) {
            res.status(404)
            throw new Error('note not found')
        }
        return res.status(200).json(note)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

const updateFavorited = asyncHandler( async (req, res) => {
    const tProjectId  = req.params.projectId
    if (!tProjectId) {
        res.status(400)
        throw new Error('project id not found')
    }
    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('note id not found')
    }
    try {
        const { favorited, ...otherKeys} = req.body
        const note = await Note.findOneAndUpdate(
            { projectId: tProjectId, _id: id},
            { favorited: favorited },
            { new: true }
        )
        // console.log(activity)
        if (!note) {
            res.status(404)
            throw new Error('note not found')
        }
        return res.status(200).json(note)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

module.exports = {
    findAll,
    create,
    remove,
    update,
    updateFavorited
}
