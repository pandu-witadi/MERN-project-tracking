//
//
import {
    createStore,
    applyMiddleware,
    combineReducers,
    // compose
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const middleware = [thunk]

import { settingReducer } from './reducer/setting'
import { authReducer } from './reducer/auth'
import { projectReducer } from './reducer/project'

const reducer = combineReducers({
    setting: settingReducer,
    auth: authReducer,
    project: projectReducer
})

const mode = JSON.parse( localStorage.getItem('mode') )
const user = JSON.parse( localStorage.getItem('authUser') )
const initialState = {
    setting: {
        mode: mode ? mode: 'dark',
        isProfileOpen: false
    },
    auth: {
        user: user ? user : null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    }
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store
