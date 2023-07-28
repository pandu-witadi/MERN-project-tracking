//
//
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Toolbar,
    Box,
    Link,
    Tabs,
    Tab,
    Typography,
    Stack,
    InputLabel,
    TextField,
    Grid,
    Button,

    FormControlLabel ,
    RadioGroup,
    Radio,

    Collapse,
    Alert,
    AlertTitle
} from '@mui/material'

import { reset, create } from '../../store/action/project'
import Loader from '../../component/Loader'


const Add = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector( (state) => state.auth  )

    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const [projectData, setProjectData] = useState({
       regID: '',
       title: '',
       tags: '',
       desc: '',
       phase: ''
    })
    const {
        regID,
        title,
        tags,
        phase,
        desc
    } = projectData

    const onChange = (e) => {
       setProjectData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
       }))
    }

    const [selectedPhase, setSelectedPhase] = useState("pre")
    const handlePhase = (e) => setSelectedPhase(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        projectData.creatorId = user._id
        projectData.phase = selectedPhase
        projectData.tags = tags.split(',').map(item => item.trim())
        // projectData.tags = tagsArr.join()
        dispatch( create(projectData) )
    }

    const  { isLoading, isError, isSuccess, message } = useSelector( (state) => state.project )
    useEffect(() => {
       if (isSuccess) {
           dispatch( reset() )
           navigate('/project/list')
       }
       if (isError) {
           setIsAlert(true)
           setAlertMessage(message)
       }
   }, [isLoading, isError, isSuccess, message, navigate, dispatch])

    return (
        <>
            { isLoading && <Loader /> }
            <Container>
                <Toolbar sx={{mt: 2,  display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        Back to  &nbsp;
                        <Link href={'/project'} underline="hover" color="secondary" fontWeight='bold'>Project</Link>
                    </Box>
                </Toolbar>

                { isAlert  &&
                    <Collapse in={isAlert}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error" onClick={() => {setIsAlert(false)}} >
                                <AlertTitle>Error</AlertTitle>
                                { alertMessage }
                            </Alert>
                        </Stack>
                    </Collapse>
                }

                <Typography sx={{ fontSize:'150%', fontWeight: 'bold', mb: 2 }}>Create a new project</Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <TextField
                        fullWidth
                            xs={9}
                            required
                            type="text"
                            placeholder="Enter project register ID"
                            name='regID'
                            label='regID'
                            value={regID}
                            onChange={onChange}
                        />
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                        fullWidth
                            required
                            type="text"
                            placeholder="Enter project title"
                            name='title'
                            label='title'
                            value={title}
                            onChange={onChange}
                        />
                        </Grid>
                    </Grid>
                    <Box margin="1rem" component="fieldset">
                        <legend>Phase</legend>
                        <RadioGroup
                            onChange={handlePhase}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="pre" control={<Radio />} label="pre" />
                            <FormControlLabel value="ongoing" control={<Radio />} label="ongoing" />
                            <FormControlLabel value="closed" control={<Radio />} label="closed" />
                        </RadioGroup>
                    </Box>
                    <Stack spacing={1} >
                            <TextField
                            type="text"
                            placeholder="project desc"
                            name='desc'
                            label='desc'
                            value={desc}
                            onChange={onChange}
                        />
                        <TextField
                        required
                            type="text"
                            placeholder="ex: ML, AI, human resource"
                            name='tags'
                            label='tags'
                            value={tags}
                            onChange={onChange}
                        />
                    </Stack>

                <Stack margin="2rem" direction="row" alignItems="center" spacing={3}>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary">
                        Create Project
                    </Button>
                </Stack>

            </form>
            </Container>
        </>
    )
}

export { Add }
