//
//
import { useSelector, useDispatch } from 'react-redux'
import {
    CssBaseline,
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Tooltip
} from '@mui/material'
import {
    Menu as MenuIcon,
    Login as LoginIcon,
    LightModeOutlined,
    DarkModeOutlined
}  from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

import { CHANGE_MODE } from '../../store/constant/setting'
import AvatarIcon from './AvatarIcon'


const NavBar = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { user } = useSelector( (state) => state.auth  )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Tooltip title="main menu">
                            <MenuIcon />
                        </Tooltip>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MERN-template-mui
                    </Typography>
                    <Tooltip title="mode">
                        <IconButton onClick={() => dispatch({ type: CHANGE_MODE }) }>
                            { theme.palette.mode === "dark" ? (
                                <DarkModeOutlined sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightModeOutlined sx={{ fontSize: "25px" }} />
                            ) }
                        </IconButton>
                    </Tooltip>
                    { user ? (
                        <AvatarIcon user={user} />
                    ) : (
                        <Box display='flex' justifyContent='space=between' alignItems='center'>
                            <Button color="inherit" href='/login'>
                                Login
                            </Button>
                            <Button color="inherit" href='/register'>
                                Register
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar
