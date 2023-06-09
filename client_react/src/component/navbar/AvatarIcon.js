//
//
import { useState } from 'react'
import { Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'

import AvatarIconMenu  from './AvatarIconMenu'
import { baseURL } from '../../config'


const AvatarIcon = ({ user }) => {
    const [anchorUserMenu, setAnchorUserMenu] = useState(null)

    return (
        <Box>
            {/*
            <IconButton size="large" color="inherit">
                <Badge color="error" badgeContent={5}>
                    <Notifications />
                </Badge>
            </IconButton>
            */}
            <Tooltip title={user?.username}>
                <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    <Avatar src={baseURL + '/' + user?.avatarUrl} alt={user?.username}>
                        {user?.avatarUrl}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <AvatarIconMenu  {...{ user, anchorUserMenu, setAnchorUserMenu }} />
        </Box>
    )
}

export default AvatarIcon
