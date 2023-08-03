//
//
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
    Grid,
    Divider,

} from '@mui/material'

import {
    findAll,
    create,
    update,
    remove
} from '../../service/activity'
import ActivityPhase from '../../component/activity/ActivityPhase'
import DialogActivityEdit from '../../component/activity/DialogActivityEdit'
import DialogActivityDelete from '../../component/activity/DialogActivityDelete'

import {
    findAllMessage,
    createMessage
} from '../../service/message'
import MessageList from '../../component/message/MessageList'


const Activity = () => {
    const navigate = useNavigate()

    const { projectId } = useParams()
    const { user } = useSelector( (state) => state.auth  )

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const styles = {
        gridItem: {
            minWidth: "240px",
        }
    }

    // --- loading page
    const [activityList, setActivityList] = useState([])
    const fetchActivityByProjectId = async projectId => {
        setIsLoading(true)
        try {
            const data = await findAll(projectId)
            setActivityList(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchActivityByProjectId(projectId)
    }, [])


    // --- Add & Edit
    const [openDialogActivityEdit, setOpenDialogActivityEdit] = useState(false)
    const [dataDialogActivityEdit, setDataDialogActivityEdit] = useState({data: {}})
    const dialogActivityEditOnCancelClicked = () => setOpenDialogActivityEdit(false)

    const dialogActivityEditOnConfirmClicked = async (item) => {
        setOpenDialogActivityEdit(false)
        setIsLoading(true)
        if (!item["id"]) {
            item["listPhase"] = ["planning", "ongoing", "done"]
            item.creatorId = user._id
            try {
                const data = await create(projectId, item)
            } catch (err) {
                setIsError(err)
            }
        } else {
            try {
                const data = await update(projectId, item.id, item)
            } catch (err) {
                setIsError(err)
            }
        }
        setIsLoading(false)
        fetchActivityByProjectId(projectId)
    }

    const onActionAdd = (keyId) => {
       setDataDialogActivityEdit(
           {
               title: "add activity",
               cancelText: "Cancel",
               confirmText: "Submit",
               data: {
                   phase: keyId
               },
           }
       )
       setOpenDialogActivityEdit(true)
   }

   const onActionEdit = (item) => {
        setDataDialogActivityEdit(
            {
                title: "edit activity",
                cancelText: "Cancel",
                confirmText: "Submit",
                data: item,
            }
        )
        setOpenDialogActivityEdit(true)
    }

    const onActionDelete = (item) => {
        setDataDialogActivityDelete(
            {
                title: "Activity Delete",
                cancelText: "Cancel",
                confirmText: "Delete",
                contents: `Are you sure to delete activity "${item.title}" ?`,
                data: item
            }
        )
        setOpenDialogActivityDelete(true)
    }

    // --- Delete
    const [openDialogActivityDelete, setOpenDialogActivityDelete] = useState(false)
    const [dataDialogActivityDelete, setDataDialogActivityDelete] = useState({data: {}})
    const dialogActivityDeleteOnCancelClicked = () => setOpenDialogActivityDelete(false)
    const dialogActivityDeleteOnConfirmClicked = async (item) => {
       setOpenDialogActivityDelete(false)
       setIsLoading(true)
       try {
           const data = await remove(projectId, item.id)
       } catch (err) {
           setIsError(err)
       }
       setIsLoading(false)
       fetchActivityByProjectId(projectId)
   }


    //----------- MESSAGE ----------------------------
    const [messageList, setMessageList] = useState([])
    const [activity, setActivity] = useState(null)

    const fetchMessage = async (projectId, activityId) => {
        setIsLoading(true)
        try {
            const data = await findAllMessage(projectId, activityId)
            setMessageList(data)
        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
    }
    const [showChat, setShowChat] = useState(false)
    const showChatOnClick = () => setShowChat(!showChat)
    const onActionMessage = (item) => {
        setActivity(item)
        fetchMessage(projectId, item._id)
        setShowChat(true)
    }


const sendMessage = async (projectId, activityId, msg) => {
        // console.log('sendMessage', projectId, activityId, msg)
        setIsLoading(true)
        try {
            const { data } = await createMessage(projectId, activityId, msg)

        } catch (err) {
            setIsError(err)
        }
        setIsLoading(false)
        fetchMessage(projectId, activityId)
    }

    const onSendMessage = (msg) => {
        if (msg.msg === "")
            return

        let new_msg = {
            creatorId: user._id,
            ...msg
        }
        console.log(new_msg)
        sendMessage(projectId, msg.activityId, new_msg)
    }




    return (
        <>
            <h3>project activity : {projectId}</h3>

            <Grid container>
                <Grid item xs={7.2}>
                    <Grid container spacing={1}>
                    <Grid item sx={styles.gridItem}>

                        <ActivityPhase {...{
                             phase: { keyId: "planning", title: "Planning" },
                             data: activityList.filter((item) => item["phase"] === "planning"),
                             action: {
                                  onActionAdd: onActionAdd,
                                  onActionEdit: onActionEdit,
                                  onActionDelete: onActionDelete,
                                  onActionMessage: onActionMessage
                             }
                        }} />
                    </Grid>
                    <Grid item sx={styles.gridItem}>
                        <ActivityPhase {...{
                            phase: { keyId: "ongoing", title: "Ongoing" },
                             data: activityList.filter((item) => item["phase"] === "ongoing"),
                             action: {
                                 onActionAdd: onActionAdd,
                                 onActionEdit: onActionEdit,
                                 onActionDelete: onActionDelete,
                                 onActionMessage: onActionMessage
                             }
                        }} />
                    </Grid>
                    <Grid item sx={styles.gridItem}>
                        <ActivityPhase {...{
                            phase: { keyId: "done", title: "Done" },
                             data: activityList.filter((item) => item["phase"] === "done"),
                             action: {
                                 onActionAdd: onActionAdd,
                                 onActionEdit: onActionEdit,
                                 onActionDelete: onActionDelete,
                                 onActionMessage: onActionMessage
                             }
                        }} />
                    </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4.8}>
                    { showChat &&
                        <MessageList
                            data={messageList}
                            currentUser={user}
                            onCloseMessage={()=> setShowChat(false)}
                            onSendMessage={onSendMessage}
                            activity={activity}
                        />
                    }
                </Grid>
            </Grid>

            <DialogActivityEdit
                open={openDialogActivityEdit}
                data={dataDialogActivityEdit}
                onCancelClicked={dialogActivityEditOnCancelClicked}
                onConfirmClicked={dialogActivityEditOnConfirmClicked}
            />

            <DialogActivityDelete
                open={openDialogActivityDelete}
                data={dataDialogActivityDelete}
                onCancelClicked={dialogActivityDeleteOnCancelClicked}
                onConfirmClicked={dialogActivityDeleteOnConfirmClicked}
            />
        </>
    )
}

export { Activity }
