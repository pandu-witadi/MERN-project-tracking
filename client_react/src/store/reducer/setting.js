//
//
import {
    CHANGE_MODE,
    OPEN_PROFILE,
    CLOSE_PROFILE
} from '../constant/setting'

export const settingReducer = (
    state = {
        setting: {}
    },
    action
) => {
    switch (action.type) {

        case CHANGE_MODE:
            let locMode = state.mode === 'light' ? 'dark' : 'light'

            localStorage.setItem('mode', JSON.stringify(locMode))
            return {
                ...state,
                mode: locMode
            }
        case OPEN_PROFILE:
            return {
                ...state,
                isProfileOpen: true
            }
            case CLOSE_PROFILE:
                return {
                    ...state,
                    isProfileOpen: false
                }
        default:
           return state
    }
}
