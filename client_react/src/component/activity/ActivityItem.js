//
//
import {
    Box,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material"
import {useTheme} from "@mui/material/styles"
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'


const ActivityItem = ({ data, action }) => {
     const theme = useTheme()
     const styles = {
       paper: {
           border: 1,
           borderColor: theme.palette.divider,
           mb: 1
       },
       stack: {
         backgroundColor: theme.palette.divider
       },
       desc: {
           fontSize: '80%',
           color: theme.palette.text.secondary
       },
       box: {
           p: 1
       }
   }

   const onActivityEditClicked = () => action.onActionEdit(data)
   const onActivityDeleteClicked = () => action.onActionDelete(data)
   const onActivityMessageClicked = () => action.onActionMessage(data)


    return (
        <>
            <Paper sx={styles.paper}>
                <Stack direction={'row'} justifyContent={'flex-end'} sx={styles.stack}>
                   <Tooltip title="Edit activity">
                       <IconButton onClick={onActivityEditClicked}><EditCalendarOutlinedIcon fontSize={'small'}/></IconButton>
                   </Tooltip>
                   <Tooltip title="Delete activity">
                       <IconButton onClick={onActivityDeleteClicked}><EventBusyOutlinedIcon fontSize={'small'}/></IconButton>
                   </Tooltip>
                   <Tooltip title="Show activity message">
                       <IconButton onClick={onActivityMessageClicked}><ChatOutlinedIcon fontSize={'small'}/></IconButton>
                   </Tooltip>
               </Stack>
                <Box sx={styles.box}>
                    <Typography>{data["title"]}</Typography>
                    <Typography sx={styles.desc}>{data["desc"]}</Typography>
                </Box>
            </Paper>
        </>
    )
}

export default ActivityItem
