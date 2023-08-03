//
//
import axios from 'axios'

import { baseURL } from '../config'

const statAll = async () => {
    const { data } = await axios.get(baseURL + `/api/project/stat/all`)
    return data
}

const statById = async (projectId) => {
    const data = await axios.get(baseURL + `/api/project/stat/${projectId}`)
    return data
}

const search = async( param ) => {
    console.log(param)
    const { data } = await axios.get(baseURL + `/api/project/search${param}`)
    return data.projects
}

const findById = async( projectId ) => {
    const { data } = await axios.get(baseURL + `/api/project/${projectId}`)
    return data
}

const update = async( projectId, projectData ) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { data } = await axios.put(baseURL + `/api/project/${projectId}`, projectData, config)
    return data
}


export {
    statAll,
    statById,
    search,
    findById,
    update
}
