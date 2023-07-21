//
//
const mongoose = require('mongoose')

const { schemaOption } = require('../modelOption')


const basicKey = {
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    desc: String,
    phase: {
        type: String,
        default: "pre"
    },
    listPhase: {
        type: [],
        default: []
    }
}

const MessageSchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'message' }
)

module.exports = mongoose.model('Message', MessageSchema)
