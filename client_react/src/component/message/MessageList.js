//
//
import { createRef, useEffect } from "react"

import {useTheme} from "@mui/material/styles"
import {
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Toolbar,
    Typography,
    Container
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"


const MessageList = (props) => {
    const theme = useTheme()
    const styles = {
        container: {
            // marginTop: "50px",
        },
        toolbar: {
            width: '100%',
            p: 1,
            backgroundColor: theme.palette.primary.main,
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
        },
        toolbarText: {
            width: '100%',
            color: theme.palette.primary.contrastText,
        },
        paper: {
            height: "85vh",
            maxWidth: "500px",
            maxHeight: "1000px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: "5px",
            overflowY: "auto",
            overflowX: "hidden",
            height: "calc( 100% - 70px )",
        }
    }

    const messagesEndRef = createRef()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [props.data])

    return (
        <Container disableGutters maxWidth={false}>
            <Paper sx={styles.paper}>
                <Stack direction={"row"} sx={styles.toolbar}>
                    <Typography sx={styles.toolbarText}>{props.activity.phase} : {props.activity.title}</Typography>
                    <IconButton size={'small'} onClick={props.onCloseMessage}>
                    <CloseIcon fontSize={'small'} sx={styles.toolbarText}/>
                    </IconButton>
                </Stack>
                <Box sx={styles.messagesBody}>
                    {props.data &&
                        props.data.map((msg) => (
                            <MessageItem key={msg._id} data={msg} currentUser={props.currentUser}/>))
                    }
                    <div ref={messagesEndRef}/>
                </Box>
                <MessageInput onSendMessage={props.onSendMessage} activityId={props.activityId}/>
            </Paper>
        </Container>
    )
}

export default MessageList
