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
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Activity',
    },
    msg: String,
    mode: {
        type: Number,
        default: 0
    }
}

const MessageSchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'message' }
)

module.exports = mongoose.model('Message', MessageSchema)
