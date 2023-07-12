//
//
import {
    PROJECT_RESET,
    PROJECT_REQUEST,

    PROJECT_REMOVE_SUCCESS,
    PROJECT_REMOVE_FAIL,

    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAIL
} from '../constant/project'

export const projectReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case PROJECT_RESET:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: false,
                message: ''
            }
        case PROJECT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case PROJECT_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload,
                message: null
            }
        case PROJECT_REMOVE_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload,
                isSuccess: false
            }

        case PROJECT_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                data: action.payload,
                message: null
            }
        case PROJECT_CREATE_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
                data: null,
                message: action.payload
            }


        default:
           return state
    }
}
