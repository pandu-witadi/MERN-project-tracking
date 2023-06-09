//
//
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

export const authReducer = (
    state = {
        auth: {}
    },
    action
) => {
    switch (action.type) {
        case AUTH_RESET:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: ''
            }
        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                user: null
            }

        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                user: null,
                message: action.payload
            }
        case AUTH_REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload,
                isSuccess: false
            }

        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                user: action.payload,
                message: null
            }
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                user: null,
                message: action.payload
            }

        case AUTH_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                user: action.payload,
                message: null
            }
        case AUTH_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                user: null,
                message: action.payload
            }

        default:
           return state
    }
}
