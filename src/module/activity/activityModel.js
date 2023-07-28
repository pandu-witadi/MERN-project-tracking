//
//
const mongoose = require('mongoose')

const { schemaOption } = require('../modelOption')


const basicKey = {
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    desc: String,
    log: String,
    phase: {
        type: String,
        default: "pre"
    },
    listPhase: {
        type: [],
        default: []
    }
}

const ActivitySchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'activity' }
)

module.exports = mongoose.model('Activity', ActivitySchema)
