//
//
import axios from 'axios'

import { baseURL } from '../config'


const findAllMessage = async( projectId, activityId ) => {
    const { data } = await axios.get(baseURL + `/api/message/find-all/${projectId}/${activityId}`)
    return data
}

const createMessage = async( projectId, activityId, item ) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const { data } = await axios.post(baseURL + `/api/message/${projectId}/${activityId}`, item, config)
    return data
}
//
// const update = async( projectId, itemId, item ) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     const { data } = await axios.put(baseURL + `/api/activity/${projectId}/${itemId}`, item, config)
//     return data
// }
//
// const remove = async(projectId, itemId) => {
//     const config = {
//         headers: {
//         //     'x-access-token': userInfo.accessToken
//         }
//     }
//     const { data } = await axios.delete(baseURL +  `/api/activity/${projectId}/${itemId}`, config)
// }

export {
    findAllMessage,
    createMessage,
    // update,
    // remove
}
