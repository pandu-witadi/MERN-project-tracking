//
//
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material"

const DialogActivityDelete = (props) => {
    const onCancelClicked = () => props.onCancelClicked()
    const onConfirmClicked = () => props.onConfirmClicked(props.data["data"])

    return (
        <>
           <Dialog
               open={props.open}
               onClose={onCancelClicked}>
               <DialogTitle>
                   {props.data.title}
               </DialogTitle>
               <DialogContent>
                   {props.data.contents}
               </DialogContent>
               <DialogActions>
                   <Button onClick={onCancelClicked}>{props.data.cancelText}</Button>
                   <Button onClick={onConfirmClicked} autoFocus>
                       {props.data.confirmText}
                   </Button>
               </DialogActions>
           </Dialog>
       </>
    )

}


export default DialogActivityDelete
