//
//
import axios from 'axios'

import { baseURL } from '../../config'
import {
    PROJECT_RESET,
    PROJECT_REQUEST,

    PROJECT_REMOVE_SUCCESS,
    PROJECT_REMOVE_FAIL,

    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAIL,

    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAIL
} from '../constant/project'

export const reset = () => async( dispatch ) => dispatch({ type: PROJECT_RESET })

export const create = (projectData) => async( dispatch ) => {
    try {
        dispatch({ type: PROJECT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(baseURL + '/api/project/create', projectData, config)
        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const remove = (id) => async( dispatch ) => {
    try {
        dispatch({ type: PROJECT_REQUEST })
        const config = {
            headers: {
            //     'x-access-token': userInfo.accessToken
            }
        }
        const { data } = await axios.delete(baseURL + `/api/project/${id}`, config)
        console.log(data)
        dispatch({
            type: PROJECT_REMOVE_SUCCESS,
            payload: data
        })
    } catch(err) {
        dispatch({
            type: PROJECT_REMOVE_FAIL,
            payload: err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

// export const update = (projectData) => async( dispatch ) => {
//     try {
//         dispatch({ type: PROJECT_REQUEST })
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         const { data } = await axios.put(baseURL + `/api/project/${projectData._id}`, projectData, config)
//         console.log(data)
//         dispatch({
//             type: PROJECT_UPDATE_SUCCESS,
//             payload: data
//         })
//     } catch(err) {
//         dispatch({
//             type: PROJECT_UPDATE_FAIL,
//             payload: err.response && err.response.data && err.response.data.message
//                   ? err.response.data.message
//                   : err.message
//         })
//     }
// }
// export const find = (param) => async( dispatch ) => {
//     try {
//         dispatch({ type: PROJECT_REQUEST })
//         const { data } = await axios.get(baseURL + `/api/project/find?${param}`)
//         console.log('find-action', param, data)
//         dispatch({
//             type: PROJECT_FIND_SUCCESS,
//             payload: tmp
//          })
//
//
//     } catch(err) {
//         dispatch({
//             type: PROJECT_FIND_FAIL,
//             payload: err.response && err.response.data && err.response.data.message
//                   ? err.response.data.message
//                   : err.message
//         })
//     }
// }
