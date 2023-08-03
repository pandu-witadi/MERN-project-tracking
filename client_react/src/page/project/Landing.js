//
//
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Container,
    Toolbar,
    Box,
    Stack,
    Link,
    Divider
} from '@mui/material'

import {
    statById
} from '../../service/project'

const Landing = () => {
    const navigate = useNavigate()
    const { projectId } = useParams()
    console.log('Landing', projectId)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [projectStat, setProjectStat] = useState({})
    const fetchProjectStat = async () => {
        setIsLoading(true)
        try {
            const { data } = await statById(projectId)
            console.log('data', data)
            setProjectStat(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProjectStat(projectId)
    }, [projectId])

    const goInfo = async (e) => {
        e.preventDefault()
        navigate(`/project/info/${projectId}`)
    }

    const goActivity = async (e) => {
        e.preventDefault()
        navigate(`/activity/${projectId}`)
    }

    const goNote = async (e) => {
        e.preventDefault()
        navigate(`/note/${projectId}`)
    }

    return (
        <>
            <Container>
            <p>Project Statistic: </p>
            <pre>{JSON.stringify(projectStat)}</pre>
            <Divider />
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        Go to  &nbsp;
                        <Link
                            underline="hover" color="secondary" fontWeight='bold'
                            onClick={goInfo}
                        >
                            Info
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        Go to  &nbsp;
                        <Link
                            underline="hover" color="secondary" fontWeight='bold'
                            onClick={goActivity}
                        >
                            Activity
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        Go to  &nbsp;
                        <Link
                            underline="hover" color="secondary" fontWeight='bold'
                            onClick={goNote}
                        >
                            Note
                        </Link>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export { Landing }
