//
//
const mongoose = require('mongoose')
const dotenv = require('dotenv')


const Project = require('./module/project/projectModel')

const projects = require('./data/project')

const connectMongoDB = require('./db/mongodb-conn')

dotenv.config()

connectMongoDB()

const importData = async() => {
    try {
        await Project.deleteMany()

        const projectsCreated = await Project.insertMany(projects)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Project.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
