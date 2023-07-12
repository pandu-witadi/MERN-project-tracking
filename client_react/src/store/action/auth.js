//
//
import axios from 'axios'

import { baseURL } from '../../config'
import {
    AUTH_RESET,
    AUTH_REQUEST,
    AUTH_LOGOUT,

    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,

    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,

    AUTH_UPDATE_SUCCESS,
    AUTH_UPDATE_FAIL
} from '../constant/auth'


export const reset = () => async( dispatch ) => dispatch({ type: AUTH_RESET })

export const logout = () => async( dispatch ) => {
    localStorage.removeItem('authUser')
    dispatch({ type: AUTH_LOGOUT })
    dispatch({ type: AUTH_RESET })
    // document.location.href = '/login'
}

export const register = (userData) => async( dispatch ) => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(baseURL + '/api/auth/register', userData, config)
        dispatch({
            type: AUTH_REGISTER_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: AUTH_REGISTER_FAIL,
            payload: err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const login = (userData) => async( dispatch ) => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(baseURL + '/api/auth/login', userData, config)
        localStorage.setItem( 'authUser', JSON.stringify(data) )
        dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: AUTH_LOGIN_FAIL,
            payload: err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}

export const update = (accessToken, userData) => async ( dispatch ) => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accessToken': accessToken
            }
        }
        const { data } = await axios.put(baseURL + '/api/auth/update', userData, config)
        dispatch({
            type: AUTH_UPDATE_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: AUTH_UPDATE_FAIL,
            payload: err.response && err.response.data && err.response.data.message
                  ? err.response.data.message
                  : err.message
        })
    }
}
