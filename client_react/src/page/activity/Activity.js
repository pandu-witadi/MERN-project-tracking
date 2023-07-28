//
//
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Grid } from '@mui/material'

import {
    findAll,
    create,
    update,
    remove
} from '../../service/activity'

import ActivityPhase from '../../component/activity/ActivityPhase'
import DialogActivityEdit from '../../component/activity/DialogActivityEdit'
import DialogActivityDelete from '../../component/activity/DialogActivityDelete'


const Activity = () => {
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
            console.log('activityList.length', data.length)
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


    const onActionMessage = (item) => {
       console.log("action message clicked")
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


    return (
        <>
            <h3>Activity {projectId}</h3>
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
