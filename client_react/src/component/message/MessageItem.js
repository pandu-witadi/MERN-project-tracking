//
//
import {
    Avatar,
    Grid,
    Typography
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined'
import moment from 'moment'

const MessageItem = (props) => {
    const theme = useTheme()
    const styles = {
        displayNameOther: {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            fontSize: '90%'
        },
        messageContentOther: {
            color: theme.palette.text.primary
        },
        containerMessageOther: {
            textAlign: "left",
            m: 1
        },
        avatarOther: {
            color: theme.palette.getContrastText(theme.palette.divider),
            backgroundColor: theme.palette.divider,
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        messageOther: {
            pl: 1,
            pr: 1,
            pt: 1,
            backgroundColor: theme.palette.divider,
            width: "60%",
            minHeight: "30px",
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageTimeStampOther: {
            fontSize: "70%",
            color: theme.palette.text.secondary,
            textAlign: 'right'
        },

        displayNameMine: {
            fontWeight: 'bold',
            color: theme.palette.primary.contrastText,
            fontSize: '90%'
        },
        messageContentMine: {
            color: theme.palette.primary.contrastText
        },
        containerMessageMine: {
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "right",
            m: 1
        },
        messageMine: {
            pl: 1,
            pr: 1,
            pt: 1,
            marginRight: "20px",
            position: "relative",
            backgroundColor: theme.palette.success.main,
            width: "60%",
            textAlign: "left",
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageTimeStampMine: {
            fontSize: "70%",
            color: theme.palette.success.contrastText,
            textAlign: 'right'
        },

        importantMessage: {
            ml: 1,
            color: theme.palette.warning.main
        }
    }

    const TextModeView = (props) => {
        return (
            <>
                {
                    props.mode === 1 && <AnnouncementOutlinedIcon fontSize={'small'} sx={styles.importantMessage}/>
                }
            </>
        )
    }

    const MessageOther = (data) => {
        const message = data.msg ? data.msg : "no message"
        const timestamp = data['updatedAt'] ? moment( data['updatedAt'] ).format("YYYY-MM-DD  HH:mm:ss") : ""
        const userAvatar = data.creatorId.avatarUrl ? data.creatorId.avatarUrl : ""
        const displayName = data.creatorId.username ? data.creatorId.username : ""
        const modeText = data.mode ? data.mode : 0
        return (
            <>
                <Grid container sx={styles.containerMessageOther}>
                    <Grid item sx={{mr: 1}}>
                        <Avatar display={'inline'}
                                alt={displayName}
                                style={styles.avatarOther}
                                src={userAvatar}
                        />
                    </Grid>
                    <Grid item sx={styles.messageOther}>
                        <Typography sx={styles.displayNameOther}>{displayName}<TextModeView mode={modeText}/></Typography>
                        <Typography sx={styles.messageContentOther}>{message}</Typography>
                        <Typography sx={styles.messageTimeStampOther}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    const MessageMine = (user, data) => {
        const message = data.msg ? data.msg : "no message"
        const timestamp = data['updatedAt'] ? moment( data['updatedAt'] ).format("YYYY-MM-DD  HH:mm:ss") : ""
        const modeText = data.mode ? data.mode : 0;
        return (
            <>
                <Grid container sx={styles.containerMessageMine}>
                    <Grid item sx={styles.messageMine}>
                        <Typography sx={styles.displayNameMine}>{user.username}<TextModeView mode={modeText}/></Typography>
                        <Typography sx={styles.messageContentMine}>{message}</Typography>
                        <Typography sx={styles.messageTimeStampMine}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    return (
        <>
            {
                props.data["creatorId"]['_id'] === props.currentUser["_id"] ? MessageMine(props.currentUser, props.data) : MessageOther( props.data)
            }
        </>
    )
}

export default MessageItem
