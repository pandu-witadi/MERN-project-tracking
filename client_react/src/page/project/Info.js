//
//
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom'
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

import Loader from '../../component/Loader'

import axios from 'axios'
import { baseURL } from '../../config'
import { remove } from '../../store/action/project'


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const Info = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { mode, searchQuery } = location.state

    const { id } = useParams()
    // console.log('project_id', id)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

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

    const fetchProjectByID = async (param) => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(baseURL + `/api/project/${param}`)
            setProjectData(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProjectByID(id)
        console.log(projectData)
        setSelectedPhase(projectData?.phase)
    }, [])

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('delete', projectData._id)
        // dispatch( remove(projectData._id) )
        navigate('/project/list')
    }

    const handleBackProject = async (e) => {
        e.preventDefault()
        const params = {
            mode: mode,
            q: searchQuery
        }
        navigate(
            {
                pathname: '/project/list',
                search: `?${createSearchParams(params)}`
            }
        )
    }

    const onChange = (e) => {
       setProjectData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
       }))
    }

    const [selectedPhase, setSelectedPhase] = useState(projectData?.phase)
    const handlePhase = (e) => setSelectedPhase(e.target.value)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            { isLoading && <Loader /> }
            <Container>
                <Toolbar sx={{mt: 2,  display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
                        Back to  &nbsp;
                        <Link
                            underline="hover" color="secondary" fontWeight='bold'
                            onClick={handleBackProject}
                        >
                            Project
                        </Link>
                    </Box>
                </Toolbar>
                <Typography sx={{ fontSize:'150%', fontWeight: 'bold', mb: 2 }}>Project Info {projectData._id}</Typography>

                <form>
                    <Grid container spacing={2} sx={{mb: 2}}>
                        <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            type="text"
                            label='regID'
                            name='regID'
                            value={projectData?.regID}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            fullWidth
                            type="text"
                            label='title'
                            name='title'
                            value={projectData?.title}
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
                            value={projectData?.phase}
                        >
                            <FormControlLabel value="pre" control={<Radio />} label="pre" />
                            <FormControlLabel value="ongoing" control={<Radio />} label="ongoing" />
                            <FormControlLabel value="closed" control={<Radio />} label="closed" />
                        </RadioGroup>
                    </Box>
                    <Grid container spacing={2} sx={{mb: 2}}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder="ex: ML, AI, human resource"
                                name='tags'
                                label='tags'
                                value={projectData?.tags}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder="project desc"
                                name='desc'
                                label='desc'
                                value={projectData?.desc}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>

                    <Stack margin="2rem" direction="row" alignItems="center" spacing={3}>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary">
                            Edit Project
                        </Button>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="warning"
                            onClick={handleClickOpen}
                        >
                            Open dialog
                        </Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleClose} autoFocus>
                            Agree
                            </Button>
                            </DialogActions>
                        </Dialog>


                    </Stack>
                </form>
            </Container>
        </>
    )
}

export { Info }
