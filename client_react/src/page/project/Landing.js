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


const Landing = () => {
    const navigate = useNavigate()

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
            </Container>
        </>
    )
}

export { Landing }
