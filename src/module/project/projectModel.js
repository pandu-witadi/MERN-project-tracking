//
//
const mongoose = require('mongoose')

const { schemaOption } = require('./modelOption')

const financial = {
    price: {
        type: Number,
        default: 0
    },
    expense: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    }
}

const basicKey = {
    regID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        default: 1900
    },
    phase: {
        type: String,
        default: "pre"
    },
    desc: String,
    tags: {
        type: [],
        default: []
    },
    financial: financial,
}

const ProjectSchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'project' }
)

module.exports = mongoose.model('Project', ProjectSchema)
