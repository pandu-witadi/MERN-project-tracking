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


const ProjectItem = ({ data, handleTagPhase, mode, searchQuery }) => {
    const navigate = useNavigate()

    const handleClickTag = (mode, tag) => handleTagPhase(mode, tag)
    const handleClickPhase = (mode, phase) => handleTagPhase(mode, phase)

    const [id, setId] = useState(data['_id'])
    const handleClickId = () => {
        console.log(mode, searchQuery)
        navigate(
            {
                pathname: `/project/${id}`
            },
            {
                state: {
                    mode: mode,
                    searchQuery: searchQuery
                }
            }
        )
    }

    return (
        <>
            <Box sx={{mt: 1,mb: 1}}>
                <Button sx={{ fontSize: '125%' }} onClick={handleClickId} >
                    {data['title']}
                </Button>
                <Stack direction='row' alignItems="center" spacing={2} sx={{ mb: 1}}>
                    <Typography color='text.secondary' sx={{ mb: 1 }}>{data['year']}</Typography>
                    <Typography color='text.secondary' sx={{ mb: 1 }}>{data['regID']}</Typography>
                </Stack>
                <Stack direction='row' alignItems="center" spacing={1}>
                    <Typography color='text.secondary' sx={{ mb: 1 }}>phase : </Typography>
                    <Chip
                        sx={{fontSize: '80%', borderRadius: 3, size: 'small', color: 'secondary'}}
                        label={data['phase']}
                        variant='outlined'
                        onClick={ () => { handleClickPhase('phase', data['phase']) } }
                    />
                </Stack>
                <Stack direction='row' alignItems="center" spacing={1} sx={{mt: 1,mb: 1}}>
                    <Typography color='text.secondary' sx={{ mb: 1 }}>tags : </Typography>
                    { data['tags'].map( (tag, i) =>
                        <Chip
                            sx={{fontSize: '80%', borderRadius: 3, size: 'small', color: 'secondary'}}
                            key={i}
                            label={tag}
                            variant='outlined'
                            onClick={ () => { handleClickTag('tags', tag) } }
                        />
                    )}
                </Stack>
                <Typography color='text.secondary' sx={{mt: 1, fontSize: '80%'}}>
                    Updated on : { moment( data['updatedAt'] ).format("YYYY-MM-DD  HH:mm:ss") }
                </Typography>
                <Divider sx={{mt: 1,mb: 1}} />
            </Box>
        </>
    )
}

export default ProjectItem
