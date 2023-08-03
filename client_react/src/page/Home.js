//
//
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {
    Container,
    Box,
    Link,
    Divider,
} from '@mui/material'

import NavBar from '../component/navbar/NavBar'
import { statAll } from '../service/project'


const Home = () => {
    const navigate = useNavigate()
    const { user } = useSelector( (state) => state.auth  )

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [projectStat, setProjectStat] = useState({})

    const goToProject = async (e) => {
        e.preventDefault()
        navigate('/project/list')
    }

    const fetchProjectStat = async () => {
        setIsLoading(true)
        try {
            const data = await statAll()
            setProjectStat(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }


    useEffect(() => {
        fetchProjectStat()
    }, [])

    return (
        <>
            <Container>
            <p>Project Statistic: </p>
            <pre>{JSON.stringify(projectStat)}</pre>
            <Divider />
            { user ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                    Go to  &nbsp;
                    <Link
                        underline="hover" color="secondary" fontWeight='bold'
                        onClick={goToProject}
                    >
                        Project
                    </Link>
                </Box>
            ) : (
                <h3>Guest information</h3>
            )}

            </Container>
        </>
    )
}

export default Home
