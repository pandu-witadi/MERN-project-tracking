//
//
import {
    Button,
    Card,
    Stack,
    Typography
} from "@mui/material"
import ActivityItem from '../../component/activity/ActivityItem'


const ActivityPhase = ({phase, data, action}) => {
    const styles = {
        card: {
            p: 1
        },
        stack: {
            mt: 1,
            mb: 1,
        },
        button: {
            textTransform: 'none',
        },
        title: {
            fontSize: '110%',
        }
    }

    const onActivityAddClicked = () => action.onActionAdd(phase["keyId"])


    return (
        <>
            <Card sx={styles.card}>
                <Typography sx={styles.title}>{phase.title}</Typography>
                 <Stack sx={styles.stack}>
                    {
                        data.map( (object, i) =>
                            <ActivityItem key={object["_id"]} {...{ data: object, action: action} }/>)
                    }
                 </Stack>
                 <Button
                    variant={"outlined"}
                    color={'primary'}
                    fullWidth
                    sx={styles.button}
                    onClick={onActivityAddClicked}
                >
                    Add
                </Button>
            </Card>
        </>
    )
}

export default ActivityPhase
