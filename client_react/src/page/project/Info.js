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
import { remove, update } from '../../store/action/project'


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
    // const { projectId, setProjectId } = useState(id)

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
        setSelectedPhase(projectData?.phase)
    }, [])



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


    // --- Dialog Delete
    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('delete', projectData._id)
        dispatch( remove(projectData._id) )
        navigate('/project/list')
    }

    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = (e) => {
        e.preventDefault()
        setOpenDelete(true)
    }

    const handleCloseDelete = (e) => {
        e.preventDefault()
        setOpenDelete(false)
    }

    // --- Dialog Edit
    const handleEdit = (e) => {
        e.preventDefault()
        // setProjectData({ regID, title, tags, phase, desc})
        projectData.tags = tags.split(',').map(item => item.trim())
        console.log(projectData)

        dispatch( update(projectData) )
            // setOpenEdit(false)
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
    const [openEdit, setOpenEdit] = useState(false)
    const handleOpenEdit = (e) => {
        e.preventDefault()
        setOpenEdit(true)
    }

    const handleCloseEdit = (e) => {
        e.preventDefault()
        setOpenEdit(false)
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
                <Typography sx={{ fontSize:'150%', fontWeight: 'bold', mb: 2 }}>Project Info {projectData._id ? projectData._id: ""}</Typography>

                <form>
                    <Grid container spacing={2} sx={{mb: 2}}>
                        <Grid item xs={4}>
                        <TextField fullWidth required type="text"
                            label='regID'
                            name='regID'
                            value={projectData.regID ? projectData.regID: ""}
                            InputProps={{ readOnly: true }}
                        />
                        </Grid>
                        <Grid item xs={8}>
                        <TextField fullWidth type="text"
                            label='title'
                            name='title'
                            value={projectData.title ? projectData.title: ""}
                            onChange={onChange}
                        />
                        </Grid>
                    </Grid>
                    <Box margin="1rem" component="fieldset">
                        <legend>Phase</legend>
                        <RadioGroup row
                            onChange={handlePhase}
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
                            <TextField fullWidth type="text"
                                placeholder="ex: ML, AI, human resource"
                                name='tags'
                                label='tags'
                                value={projectData.tags ? projectData.tags: ""}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth type="text"
                                placeholder="project desc"
                                name='desc'
                                label='desc'
                                value={projectData.desc ? projectData.desc: ""}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>

                    <Stack margin="2rem" direction="row" alignItems="center" spacing={3}>
                        <Button disableElevation fullWidth size="small"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleOpenEdit}
                        >
                            Edit
                        </Button>
                        <Button disableElevation fullWidth size="small"
                            type="submit"
                            variant="contained"
                            color="warning"
                            onClick={handleOpenDelete}
                        >
                            Delete
                        </Button>


                        {/* --- Dialog : Delete */}
                        <Dialog
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Confirm Delete ?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Test
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDelete}>Cancel Delete</Button>
                                <Button color="warning" onClick={handleDelete} autoFocus>
                                    Proceed Delete
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* --- Dialog : Edit */}
                        <Dialog
                            open={openEdit}
                            onClose={handleCloseEdit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Confirm Edit ?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Test
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEdit}>Cancel Edit</Button>
                                <Button color="warning" onClick={handleEdit} autoFocus>
                                    Proceed Edit
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
