//
//
import { useState, useEffect } from 'react'
import {  useLocation, createSearchParams } from 'react-router-dom'
import {
    Container,
    Toolbar,
    Divider,
    Stack,
    TextField,
    Button
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import Loader from '../../component/Loader'
import ProjectItem from '../../component/project/ProjectItem'

import axios from 'axios'
import { baseURL } from '../../config'


const List = () => {
    // const navigate = useNavigate()
    const location = useLocation()

    const [projectList, setProjectList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [mode, setMode] = useState('')

    const fetchProjectList = async (param) => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(baseURL + `/api/project/search${param}`)
            setProjectList(data.projects)
            console.log('projectList.length', data.projects.length)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    const [searchQuery, setSearchQuery] = useState('')
    const handleFind = (e) => {
        e.preventDefault()
        setMode('titleRegID')
        const params = {
            mode: 'titleRegID',
            q: searchQuery
        }
        fetchProjectList(`?${createSearchParams(params)}`)
    }

    const handleTagPhase = (mode, tag) => {
        setMode(mode)
        const params = {
            mode: mode,
            q: tag
        }
        fetchProjectList(`?${createSearchParams(params)}`)
    }


    const [searchParam, setSearchParam] = useState(location.search)
    // const testState = location.state
    // console.log(testState)

    useEffect(() => {
        // console.log('searchQuery' ,searchQuery)
        fetchProjectList(searchParam)

    }, [])

    return (
        <>
            { isLoading && <Loader /> }
            <Container>
                <Toolbar sx={{mt: 2}}/>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Stack direction="row" alignItems="center" spacing={0}>
                        <TextField
                            name='query'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter')
                                    handleFind(e)
                            }}
                            fullWidth size={'small'}
                            label={'Find a project ...'}
                            sx={{ width: '100%', marginRight: "10px" }}
                        />
                        <SearchIcon sx={{ "&:hover": { color: "blue" } }} onClick={handleFind}/>
                    </Stack>
                    <Stack>

                            <Button
                                 href="/project/add"
                                sx={{  width: "100px", marginLeft: "10px", pt: "6px", pb: "6px",}}
                                variant="contained" size={'small'} startIcon={<AddCircleOutlineIcon/>}
                            >New
                            </Button>

                    </Stack>
                </Stack>
                <Divider sx={{mt: 1, mb: 1}}/>
                { projectList &&
                    projectList.map((object, i) =>
                        <ProjectItem key={i} {...{ data: object, handleTagPhase, mode, searchQuery} } />
                    )
                }
            </Container>
        </>
    )
}

export { List }
