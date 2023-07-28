//
//
import axios from 'axios'

import { baseURL } from '../config'

const stat = async () => {
    const { data } = await axios.get(baseURL + `/api/project/stat`)
    return data
}

const search = async( param ) => {
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
    search,
    findById,
    update,
    stat
}
