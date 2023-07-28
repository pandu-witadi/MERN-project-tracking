//
//
import axios from 'axios'

import { baseURL } from '../config'


const findAll = async( projectId ) => {
    const { data } = await axios.get(baseURL + `/api/activity/find-all/${projectId}`)
    return data
}

const create = async( projectId, item ) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { data } = await axios.post(baseURL + `/api/activity/${projectId}`, item, config)
    return data
}

const update = async( projectId, itemId, item ) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { data } = await axios.put(baseURL + `/api/activity/${projectId}/${itemId}`, item, config)
    return data
}

const remove = async(projectId, itemId) => {
    const config = {
        headers: {
        //     'x-access-token': userInfo.accessToken
        }
    }
    const { data } = await axios.delete(baseURL +  `/api/activity/${projectId}/${itemId}`, config)
}

export {
    findAll,
    create,
    update,
    remove
}
