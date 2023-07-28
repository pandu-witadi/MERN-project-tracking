//
//
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField
} from "@mui/material"
import { useEffect, useState } from "react"


const DialogActivityEdit = (props) => {
    const [data, setData] = useState({})

    useEffect(() => {
        setData(props.data["data"])
    }, [props.data])

    const onCancelClicked = () => {
        props.onCancelClicked()
    }
    const onConfirmClicked = () => {
        if((data["title"] === "") || (data["desc"] === ""))
            return
        if(!(data["title"]) || !(data["desc"]))
            return

        props.onConfirmClicked(data)
    }
    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const createForm = () => {
        return (
            <Stack direction={'column'} spacing={2}   sx={{pt: 1}}>
                <TextField
                    fullWidth
                    required
                    size={'small'}
                    label="Title"
                    name={"title"}
                    value={data["title"] ? data["title"] : ""}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    required
                    size={'small'}
                    label="Description"
                    name={"desc"}
                    value={data["desc"] ? data["desc"] : ""}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    select
                    size={'small'}
                    label="Phase"
                    name={"phase"}
                    value={data["phase"] ? data["phase"] : ""}
                    onChange={onChange}
                >
                    <MenuItem value={"planning"}>Planning</MenuItem>
                    <MenuItem value={"ongoing"}>Ongoing</MenuItem>
                    <MenuItem value={"done"}>Done</MenuItem>
                </TextField>
            </Stack>
        )
    }
    return (
        <>
            <Dialog
                open={props.open}
                onClose={onCancelClicked}>
                <DialogTitle>
                    {props["data"]["title"]}
                </DialogTitle>
                <DialogContent>
                    {createForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelClicked}>{props["data"]["cancelText"]}</Button>
                    <Button onClick={onConfirmClicked} autoFocus>
                        {props["data"]["confirmText"]}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default DialogActivityEdit
