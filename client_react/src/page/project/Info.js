//
//
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,

    Box,

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
    AlertTitle,

    Divider
} from '@mui/material'

import Loader from '../../component/Loader'

import axios from 'axios'
import { baseURL } from '../../config'
import { remove } from '../../store/action/project'

import {
    findById,
    update
} from '../../service/project'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Info = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    // const { mode, searchQuery } = location.state
    const { projectId } = useParams()
    console.log('Info', projectId)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [selectedPhase, setSelectedPhase] = useState("")
    const [selectedTags, setSelectedTags] = useState("")

    const [projectData, setProjectData] = useState({
       regID: '',
       title: '',
       tags: [],
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

    const onChangePhase = (e) => setSelectedPhase(e.target.value)
    const onChangeTags = (e) => setSelectedTags(e.target.value)


    const fetchProjectByID = async (projectId) => {
        setIsLoading(true)
        try {
            const data  = await findById(projectId)
            setProjectData(data)
            setSelectedPhase(data.phase)
            setSelectedTags(data.tags.toString())
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProjectByID(projectId)
        setSelectedPhase(projectData?.phase)
    }, [])

    const onChange = (e) => {
        e.preventDefault()
        setProjectData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
        }))
    }


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
    const handleEdit = async (e) => {
        e.preventDefault()
        projectData.tags = selectedTags.split(',').map(item => item.trim())
        projectData.phase = selectedPhase

        setIsLoading(true)
        try {
            const data = await update(projectId, projectData)
            // setProjectData(data)
            // setSelectedPhase(data.phase)
            // setSelectedTags(data.tags.toString())
            fetchProjectByID(projectId)
            setSelectedPhase(projectData?.phase)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)

        setOpenEdit(false)
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
                <Typography sx={{ fontSize:'150%', fontWeight: 'bold', mb: 2 }}>Project Info {projectData._id ? projectData._id: ""}</Typography>

                <form>
                    <Grid container spacing={2} sx={{mb: 2}}>
                        <Grid item xs={4}>
                        <TextField fullWidth required type="text"
                            label='regID'
                            name='regID'
                            value={projectData.regID ? projectData.regID: ""}
                            onChange={(e) => onChange(e)}
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
                            onChange={onChangePhase}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={selectedPhase}
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
                                value={selectedTags}
                                onChange={onChangeTags}
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
