//
//
const asyncHandler = require('express-async-handler')
const Project = require('./projectModel')

const Activity = require('../activity/activityModel')
const Message = require('../message/messageModel')
const Note = require('../note/noteModel')

// utility ---------------------------------------------------------------------
const checkReqQueryEmpty = (q) => {
    return (Object.keys(q).length === 0 && q.constructor === Object)
}

const findAll = asyncHandler( async (req, res) => {
    try {
        const projects = await Project.find().sort({'updatedAt': -1})
        return res.status(200).json({
            total: projects.length,
            page: 1,
            limit: projects.length,
            projects,
        })
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

const statAll = asyncHandler( async (req, res) => {
    const data_phase = await Project.aggregate().sortByCount("phase")
    return res.status(200).json({
        phase:  data_phase
    })
})

const statById = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }
    const listActivity = await Activity.aggregate({ projectId: projectId }).sortByCount("phase")
    const listMessage = await Message.aggregate({ projectId: projectId }).sortByCount("mode")
    const listNote = await Note.aggregate({ projectId: projectId }).sortByCount("mode")
    return res.status(200).json({
        activity: listActivity,
        message: listMessage,
        note: listNote
    })
})

// -----------------------------------------------------------------------------
const create = asyncHandler( async (req, res) => {
    const { regID, title, ...otherKeys } = req.body
    if (!regID || !title) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const projectExist = await Project.findOne({ regID: regID })
    if (projectExist) {
        console.log(projectExist)
        res.status(401)
        throw new Error('regID already registered')
    }
    let projectData = { ...req.body }
    const project = await Project.create(projectData)
    if (!project) {
        res.status(401)
        throw new Error('invalid project data')
    }
    return res.status(201).json(project)
})

const remove = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }
    // console.log(id)
    const project = await Project.findOneAndDelete({ _id: projectId})
    if (!project) {
        res.status(404)
        throw new Error('project not found')
    }
    return res.status(200).json(project)
})


const search = asyncHandler( async (req, res) => {
    listMode = [
        'titleRegID',
        'tags',
        'phase'
    ]

    try {
        if ( checkReqQueryEmpty(req.query) )
            return findAll(req, res)

        if ( !req.query.mode ) {
            console.log('!req.query.mode')
            return findAll(req, res)
        }

        if ( !listMode.includes(req.query.mode) ) {
            console.log( "!listMode.includes(req.query.mode", !listMode.includes(req.query.mode))
            return findAll(req, res)
        }


        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5

        if (req.query.mode === 'titleRegID') {
            if (!req.query.q)
                return findAll(req, res)

            const listSearch = req.query.q ? [ ...req.query.q.split(",") ] : []
            const regex = listSearch.join("|")
            const projects = await Project.find ({
                $or:
                [
                    {
                        regID: { $regex: regex, $options: 'i' }
                    },
                    {
                        title: { $regex: regex, $options: 'i' }
                    }
                ]
            }).sort({'updatedAt': -1})
            return res.status(200).json({
                total: projects.length,
                page: page + 1,
                limit,
                projects,
            })
        } else if (req.query.mode === 'tags') {
            if (!req.query.q)
                return findAll(req, res)

            const tag = req.query.q ?  req.query.q : ''
            const projects = await Project.find (
                {
                    tags: { "$in": [tag] }
                }
            ).sort({'updatedAt': -1})
            return res.status(200).json({
                total: projects.length,
                page: page + 1,
                limit,
                projects,
            })
        } else if (req.query.mode === 'phase') {
            if (!req.query.q)
                return findAll(req, res)

            const projects = await Project.find ({ phase: req.query.q }).sort({'updatedAt': -1})
            return res.status(200).json({
                total: projects.length,
                page: page + 1,
                limit,
                projects,
            })
        }
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})




const infoById = asyncHandler( async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId)
        if (project) {
            return res.json(project)
        } else {
            res.status(404)
            throw new Error('Project not found')
        }
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }
})

const update = asyncHandler( async (req, res) => {
    const projectId  = req.params.projectId
    if (!projectId) {
        res.status(400)
        throw new Error('project id not found')
    }

    try {
        const { _id, __v, createdAt, updatedAt, ...otherKeys} = req.body
        console.log(otherKeys)

        const project = await Project.findByIdAndUpdate(
            projectId,
            otherKeys,
            { new: true }
        )
        if (!project) {
            res.status(404)
            throw new Error('project not found')
        }

        return res.status(200).json(project)
    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }

})

module.exports = {
    create,
    remove,
    // findProject,
    statAll,
    statById,
    search,
    infoById,
    update
}
