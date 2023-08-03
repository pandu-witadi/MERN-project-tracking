//
//
import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined'


const MessageInput = (props) => {
    const theme = useTheme()
    const styles = {
        stack: {
            p: 1,
            width: "100%",
        },
        textField: {
            mr: 1,
        },
        button: {}
    }

    const [msgText, setMsgText] = useState('')
    const [modeText, setModeText] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const sendMessage = () => {
        props.onSendMessage({
            mode: modeText,
            msg: msgText,
            activityId: props.activityId
        })
        setMsgText("")
    }
    const handleTextModeClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (value) => {
        setModeText(value)
        setAnchorEl(null)
    };
    return (
        <>
            <Stack direction={'row'} sx={styles.stack}>
                <TextField fullWidth sx={styles.textField} size={"small"} value={msgText}
                           onChange={(e) => setMsgText(e.target.value)}/>
                <IconButton
                    sx={{mr: 1}}
                    variant="contained"
                    color={modeText===0 ? 'secondary':'warning'}
                    onClick={handleTextModeClick}>
                    {modeText===0 ? <ChatBubbleOutlineOutlinedIcon fontSize={'small'}/> : <AnnouncementOutlinedIcon fontSize={'small'}/>}
                </IconButton>
                <Menu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}>
                    <MenuItem onClick={()=> handleClose(0)} disableRipple>
                        <ChatBubbleOutlineOutlinedIcon sx={{mr: 1}}/>
                        Normal
                    </MenuItem>
                    <MenuItem onClick={()=> handleClose(1)} disableRipple>
                        <AnnouncementOutlinedIcon sx={{mr: 1}}/>
                        Important
                    </MenuItem>
                </Menu>
                <Button variant="contained" color="primary" sx={styles.button} onClick={sendMessage}>
                    <SendIcon fontSize={'small'}/>
                </Button>
            </Stack>
        </>
    )
}
export default MessageInput
