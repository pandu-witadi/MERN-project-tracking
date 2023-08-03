//
//
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    Box,
    Grid,
    Modal,
    Typography,
    Fab,
    IconButton,
    Snackbar,
    Alert,
    Switch
} from '@mui/material'

import AddIcon from "@mui/icons-material/Add"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

import NoteItem from "../../component/note/NoteItem"
import AddNote from "../../component/note/AddNote"

import { findAll } from '../../service/note'


const Note = () => {
    const navigate = useNavigate()
    const { projectId } = useParams()
    // console.log('Note.js', projectId)
    const { user } = useSelector( (state) => state.auth  )

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [notes, setNotes] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [filteredNotes, setFilteredNotes] = useState([])

    const findListNote = async () => {
        setIsLoading(true)
        try {
            const data = await findAll(projectId)
            console.log('test 09', data)
            setNotes(data)
            setFilteredNotes(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        findListNote()
    }, [])

    const onSubmit = (newNote) => {
        setFilteredNotes([newNote, ...notes])
        setNotes([newNote, ...notes])
        setIsModalOpen(false)
        setIsSuccess(true)
    }

    const onDelete = (deletedNote) => {
        const newList = notes.filter((item) => item._id !== deletedNote._id)
        setNotes(newList)
        setFilteredNotes(newList)
    }

    const filterOnClick = (e) => {
        if (e.target.checked) {
            return setFilteredNotes(notes.filter((item) => item.favorited))
        }
        setFilteredNotes(notes)
    }

    return (
        <Box>
            <Snackbar
                open={isSuccess}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setIsSuccess(false)}
            >
                <Alert variant="filled" severity="success">
                    Note added successfully
                </Alert>
            </Snackbar>
            <Typography
                variant="h3"
                md={{ my: 3 }}
                sx={{ fontSize: "40px", my: 2, mr: "50px" }}
            >
                Notes {projectId}
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: "inline" }}>
                    Favorites Only
                </Typography>
                <Switch
                onChange={filterOnClick}
                    sx={{
                        "& .MuiSwitch-switchBase": {
                            "&.Mui-checked": {
                            color: "red",
                        },
                        "& + .MuiSwitch-track": {
                            backgroundColor: "red",
                            },
                        },
                    }}
                />
            </Box>
            <Grid alignItems={"stretch"} container spacing={2}>
                {filteredNotes.map((note, index) => (
                    <Grid key={index} item xs={12} md={4}>
                        <NoteItem
                            projectId={projectId}
                            note={note}
                            key={index}
                            onDelete={onDelete}
                            onUpdate={findListNote}
                        />
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddNote projectId={projectId} userId={user._id} onSubmit={onSubmit} />
            </Modal>
            <Fab
                sx={{ m: 2 }}
                className="float-button"
                color="primary"
                onClick={() => setIsModalOpen(true)}
            >
                <AddIcon />
            </Fab>
            <IconButton
                size="large"
                sx={{
                    position: "fixed",
                    top: 30,
                    right: 30,
                    cursor: "pointer",
                    color: "red",
                }}
                onClick={async () => {
                    window.localStorage.clear()
                    navigate(`/note/${projectId}`)
                }}
            >
                <ExitToAppIcon fontSize="inherit" />
            </IconButton>
        </Box>
    )
}

export { Note }
