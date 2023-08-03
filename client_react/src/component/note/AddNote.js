//
//
import { useState } from "react"


import LoadingButton from "@mui/lab/LoadingButton"
import {
    TextField,
    Box,
    Typography
} from '@mui/material'

import { create } from '../../service/note'


const AddNote = ({ projectId, userId, onSubmit }) => {
    const [loadingButton, setLoadingButton] = useState(false)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 10,
        borderRadius: 1,
        p: 8
    }
    const responsiveStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        bgcolor: "background.paper",
        boxShadow: 10,
        borderRadius: 1,
        p: 3
    }

    const newNote = async (event) => {
        event.preventDefault()
        setLoadingButton(true)

        const item = {
            creatorId: userId,
            title: noteTitle,
            content: noteContent
        }
        const data = await create(projectId, item)
        setLoadingButton(false)
        const addedNote = data.note

        onSubmit(addedNote)
        setNoteContent("")
        setNoteTitle("")
    }

    return (
        <Box sx={responsiveStyle} md={style}>
            <Typography variant="h2" sx={{ mb: 2 }}>
                Add Note
            </Typography>
            <form onSubmit={newNote}>
                <TextField
                    size="small"
                    disabled={loadingButton}
                    label="Title"
                    variant="outlined"
                    name="title"
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
                    fullWidth
                />
                <TextField
                    rows={4}
                    multiline
                    size="small"
                    disabled={loadingButton}
                    label="Content"
                    onChange={(e) => setNoteContent(e.target.value)}
                    value={noteContent}
                    name="content"
                    fullWidth
                    sx={{ my: 2 }}
                />
                <LoadingButton
                    loading={loadingButton}
                    type="submit"
                    variant="outlined"
                    sx={{ mx: "auto" }}
                >
                    Add
                </LoadingButton>
            </form>
        </Box>
    )
}

export default AddNote
