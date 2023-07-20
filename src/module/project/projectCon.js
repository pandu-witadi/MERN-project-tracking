//
//
const asyncHandler = require('express-async-handler')
const Project = require('./projectModel')

// utility ---------------------------------------------------------------------
const checkReqQueryEmpty = (q) => {
    return (Object.keys(q).length === 0 && q.constructor === Object)
}

const findProjectAll = asyncHandler( async (req, res) => {
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
    const id  = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('project id not found')
    }
    console.log(id)
    const project = await Project.findOneAndDelete({ _id: id})
    if (!project) {
        res.status(404)
        throw new Error('project not found')
    }
    console.log(project)
    // await project.remove()
    return res.status(200).json(project)

})

const findProject = asyncHandler( async (req, res) => {
    try {
        if ( checkReqQueryEmpty(req.query) ) {
            const projects = await Project.find().sort({'createAt': -1})
            return res.status(200).json({
    			total: projects.length,
    			page: 1,
                limit: projects.length,
    			projects,
    		})
        } else {
            const page = parseInt(req.query.page) - 1 || 0
    		const limit = parseInt(req.query.limit) || 5
    		const search = req.query.search || ""
    		let sort = req.query.sort || "year"
    		let tags = req.query.tags

    		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

            let sortBy = {}
    		if (sort[1])
    			sortBy[sort[0]] = sort[1]
    		else
    			sortBy[sort[0]] = "asc"

            let projects = null
            let total = 0
            if (tags) {
    		    const obj = await Project.find({ title: { $regex: search, $options: "i" } })
            		.where("tags")
            		.in([...tags.split(",")])
            		.sort(sortBy)
            		.skip(page * limit)
            		.limit(limit)
                projects = obj
                const total_obj = await Project.countDocuments({
        			tags: { $in: [...tags.split(",")] },
        			title: { $regex: search, $options: "i" },
        		})
                total = total_obj
            } else {
                const obj = await Project.find({ title: { $regex: search, $options: "i" } })
            		.sort(sortBy)
            		.skip(page * limit)
            		.limit(limit)
                projects = obj
                const total_obj = await Project.countDocuments({
        			title: { $regex: search, $options: "i" },
        		})
                total = total_obj
            }

            return res.status(200).json({
    			total,
    			page: page + 1,
    			limit,
    			tags: tags,
    			projects,
    		})
        }

    } catch (err) {
		res.status(500)
        throw new Error("Internal Server Error")
	}
})


const search = asyncHandler( async (req, res) => {
    listMode = [
        'titleRegID',
        'tags',
        'phase'
    ]

    try {
        if ( checkReqQueryEmpty(req.query) )
            return findProjectAll(req, res)

        if ( !req.query.mode ) {
            console.log('!req.query.mode')
            return findProjectAll(req, res)
        }

        if ( !listMode.includes(req.query.mode) ) {
            console.log( "!listMode.includes(req.query.mode", !listMode.includes(req.query.mode))
            return findProjectAll(req, res)
        }


        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5

        if (req.query.mode === 'titleRegID') {
            if (!req.query.q)
                return findProjectAll(req, res)

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
                return findProjectAll(req, res)

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
                return findProjectAll(req, res)

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


const statProject = asyncHandler( async (req, res) => {
    const data_phase = await Project.aggregate().sortByCount("phase")
    const data_year = await Project.aggregate().sortByCount("year")
    return res.status(200).json({
        phase:  data_phase,
        year:  data_year
    })
})

const infoById = asyncHandler( async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
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
    const id  = req.params.id
    if (!id) {
        res.status(400)
        throw new Error('project id not found')
    }
    console.log(id)

    try {
        const { _id, __v, createdAt, updatedAt, id, ...otherKeys} = req.body
        console.log(otherKeys)

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            otherKeys,
            { new: true }
        )
        console.log(project)
        if (!project) {
            res.status(404)
            throw new Error('project not found')
        }

        return res.status(200).json(project)
        // const { regID, ...otherKeys } = req.body
        //
        // const updatedProject= await project.save()
        // return res.status(200).json(updatedProject)

    } catch (err) {
        res.status(500)
        throw new Error("Internal Server Error")
    }

})

module.exports = {
    create,
    remove,
    findProject,
    statProject,
    search,
    infoById,
    update
}
