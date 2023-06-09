//
//
//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const CF = require('../../config')


const passwordHash = async(rawPassword) => {
    let salt = await bcrypt.genSalt( CF.jwt.saltLength )
    return await bcrypt.hash(rawPassword, salt)
}

const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}

const createToken = (id) => {
    return jwt.sign(
        { id },
        CF.jwt.secret_str,
        { expiresIn: CF.jwt.token_exp }
    )
}

const decodeToken = (accessToken) => {
    return jwt.verify(accessToken, CF.jwt.secret_str)
}

module.exports = {
    passwordHash,
    comparePassword,
    createToken,
    decodeToken
}
