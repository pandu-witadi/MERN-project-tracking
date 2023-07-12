//
//
const asyncHandler = require('express-async-handler')

const CF = require('../../config')
const User = require('./userModel')
const {
    passwordHash,
    comparePassword,
    createToken,
    decodeToken
} = require('./bcrypt-jwt')


const authRequired = asyncHandler( async(req, res, next) => {
    const accessToken = req.get(CF.authentication_token_name)
    if(!accessToken) {
        res.status(401)
        throw new Error('No authentication token, access denied')
    }

    try {
        const decoded = decodeToken(accessToken)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        res.status(401)
        throw new Error('Token verification failed, authorization denied')
    }
})

const register = asyncHandler( async (req, res) => {
    const { email, password, name, ...otherKeys } = req.body
    if (!email || !password || !name ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email: email })
    if (userExist) {
        res.status(401)
        throw new Error('email already registered')
    }

    let userData = {
        email: email,
        hashPassword: await passwordHash(password),
        name: name,
        ...otherKeys
    }

    if (req.files) {
        //  relative position to clinet_react/build
        let filePath = path.join(__dirname, '../../../', CF.frontEnd.path)
        const file = req.files.file

        // create avatar file name
        let extName = path.extname(file.name)
        let forName = file.name.slice(0, file.name.length - extName.length)
        let filename = forName + '-' + randomstring.generate() + extName
        file.mv(filePath + '/' + filename, err => {
            if (err)
                console.error(err)
            else
                console.log(`create avatar : ${filePath}/${filename}` )
        })
        userData.avatarUrl = filename
    }

    const user = await User.create(userData)
    if (!user) {
        res.status(401)
        throw new Error('invalid user data')
    }

    // setTimeout((() => { console.log('delay') }), 10000)

    if (CF.model.user.register_state) {
        const accessToken = createToken(user._id)
        const { hashPassword, __v, ...others } = user._doc
        return res.status(201).json({
            ...others,
            accessToken: accessToken
        })
    } else {
        return res.status(201).json({ isSuccess: true })
    }
})

const login = asyncHandler( async (req, res) => {
    const { email, password, ...otherKeys } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({ email: email })
    if (!user || !(await comparePassword(password, user.hashPassword))) {
        res.status(401)
        throw new Error('invalid credentials')
    }

    if (!CF.model.user.automated_active && !user.isActive) {
        res.status(401)
        throw new Error('not active')
    }
    const accessToken = createToken(user._id)
    const { hashPassword, __v, ...others } = user._doc
    console.log({
        ...others,
        accessToken: accessToken
    })
    return res.status(200).json({
        ...others,
        accessToken: accessToken
    })
})

const update = asyncHandler( async (req, res) => {
    const { password, ...otherKeys } = req.body
    let newHashPassword = null
    if (password && password !== '' )
        newHashPassword = await passwordHash(password)
    else
        newHashPassword = req.user.hashPassword

    let userData = {
        hashPassword: newHashPassword,
        ...otherKeys
    }

    if (req.files) {
        //  relative position to clinet_react/build
        let filePath = path.join(__dirname, '../../../', CF.frontEnd.path)
        const file = req.files.file

        // create avatar file name
        let extName = path.extname(file.name)
        let forName = file.name.slice(0, file.name.length - extName.length)
        let filename = forName + '-' + randomstring.generate() + extName
        file.mv(filePath + '/' + filename, err => {
            if (err)
                console.error(err)
            else
                console.log(`create avatar : ${filePath}/${filename}` )
        })
        userData.avatarUrl = filename
    }


    const updatedUser = await User.findByIdAndUpdate( req.user._id, userData, { new: true } )
    const accessToken = createToken(updatedUser._id)
    const { hashPassword, __v, ...others } = updatedUser._doc
    return res.status(200).json({
        ...others,
        accessToken: accessToken
    })
})

const remove = asyncHandler( async (req, res) => {
    const { email,  ...otherKeys } = req.body
    if (!email) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const user = await User.findOneAndDelete({ email: email})
    if (!user) {
        res.status(401)
        throw new Error('invalid credentials')
    }
    return res.status(200).json(user)
})

module.exports = {
    authRequired,
    register,
    login,
    update,
    remove
}
