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
    title: String,
    content: String,
    favorited: {
        type: Boolean,
        default: false    
    },
    mode: {
        type: Number,
        default: 0
    }
}

const NoteSchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'note' }
)

module.exports = mongoose.model('Note', NoteSchema)
