//
//
const mongoose = require('mongoose')

const { schemaOption } = require('../modelOption')

const basicKey = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    name: String,
    accessToken: String,
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'guest'
    },
    roleList: {
        type: [],
        default: [ 'guest']
    },
    avatarUrl: {
        type: String,
        default: "avatar-default.jpg"
    },
    profile: {}
}

const UserSchema = new mongoose.Schema(
    { ...basicKey },
    { ...schemaOption, collection: 'user' }
)

module.exports = mongoose.model('User', UserSchema)
