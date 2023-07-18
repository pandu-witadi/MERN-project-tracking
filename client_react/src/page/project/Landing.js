//
//
import { useState, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import {
    Container,
    Toolbar,
    Divider,
    Stack,
    TextField,
    Button,
    Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

import axios from 'axios'
import { baseURL } from '../../config'


const Landing = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [projectStat, setProjectStat] = useState({})
    const fetchProjectStat = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(baseURL + `/api/project/stat`)
            console.log('data', typeof data, data)
            setProjectStat(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        // console.log('searchQuery' ,searchQuery)
        fetchProjectStat()
    }, [])



    const [searchParam, setSearchParam] = useState('')
    const handleFind = (e) => {
        e.preventDefault()

        const params = {
            mode: 'titleRegID',
            q: searchParam
        }
        navigate(
            {
                pathname: '/project/list',
                search: `?${createSearchParams(params)}`,
            },
            {
                state: {
                    test: 'test'
                }

            }
        )
    }



    return (
        <>
            <Container>
                <Toolbar sx={{mt: 2}}/>
                <Stack direction="row" alignItems="center" spacing={0}>
                    <TextField
                        name='query'
                        fullWidth size={'small'}
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter')
                                handleFind(e)
                        }}
                        label={'Find a project ...'}
                        sx={{ width: '100%', marginRight: "10px" }}

                    />
                    <SearchIcon sx={{ "&:hover": { color: "blue" } }} onClick={handleFind}/>
                </Stack>
                <Divider />
                <p>Dashboard</p>
                <p>Project Statistic: </p>
                <li>
                    <ul>{JSON.stringify(projectStat)}</ul>
                    
                </li>
            </Container>
        </>
    )
}

export { Landing }
