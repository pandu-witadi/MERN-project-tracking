//
//
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Logout,
    Settings,
    Dashboard
} from '@mui/icons-material'
import {
    ListItemIcon,
    Menu,
    MenuItem
} from '@mui/material'

import UserProfile from './UserProfile'
import { OPEN_PROFILE } from '../../store/constant/setting'
import { logout } from '../../store/action/auth'


const AvatarIconMenu = ({ user, anchorUserMenu, setAnchorUserMenu }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCloseUserMenu = () => setAnchorUserMenu(null)

    const handleLogout = () => {
        navigate('/')
        dispatch( logout() )
    }
    return  (
        <>
        <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
        >
            <MenuItem onClick={() => dispatch({ type: OPEN_PROFILE }) }>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} >
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
        <UserProfile { ...{ user } } />
        </>
    )
}

export default AvatarIconMenu
