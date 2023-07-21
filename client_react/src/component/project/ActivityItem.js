//
//
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Chip,
    Divider,
    Link,
    Stack,
    Typography,
    Card
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'


const ActivityItem = ({ data }) => {
    const navigate = useNavigate()



    return (
        <>
            <Box sx={{mt: 1,mb: 1}}>
                <pre>{JSON.stringify(data)}</pre>
                <Divider sx={{mt: 1,mb: 1}} />
            </Box>
        </>
    )
}

export default ActivityItem
