//
//
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    IconButton,
    InputAdornment,
    Avatar,
    Input
} from '@mui/material'
import {
    Close,
    Send,
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

import { baseURL } from '../../config'
import { CLOSE_PROFILE } from '../../store/constant/setting'
import { update } from '../../store/action/auth'


const UserProfile = ({ user }) => {
    const { isProfileOpen } = useSelector( (state) => state.setting )
    const dispatch = useDispatch()

    // const [isAlert, setIsAlert] = useState(false)
    // const [alertMessage, setAlertMessage] = useState('')

    const handleMouseDownPassword = (e) => e.preventDefault()
    const [showPassword, setShowPassword] = useState(false)
    const handleClickPassword = () => setShowPassword(!showPassword)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const handleClickConfirmPassword = () => setConfirmShowPassword(!showConfirmPassword)
    const handleMouseDownConfirmPassword = (e) => e.preventDefault()

    const  { isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth )

    const refEmail = useRef(user.email)
    const refUsername = useRef(user.username)
    const refName = useRef(user.name)
    const refPassword = useRef(null)
    const refConfirmPassword = useRef(null)

    const [file, setFile] = useState(null)
    const [filename, setFilename] = useState(null)

    const onChangeFile = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        if (refEmail.current.value)
            formData.append('email', refEmail.current.value)
        if (refUsername.current.value)
                formData.append('username', refUsername.current.value)
        if (refName.current.value)
            formData.append('name', refName.current.value)
        if (refPassword.current.value) {
            let password = refPassword.current.value
            let confirmPassword = refConfirmPassword.current.value

            if (password && confirmPassword
                && (password.length >= 6) && (confirmPassword.length >= 6) && (password === confirmPassword)) {
                formData.append('password', password)
            }
        }

        // Display the key/value pairs
        for (var pair of formData.entries())
            console.log(pair[0]+ ', ' + pair[1])

        if (file)
            formData.append('file', file)
        dispatch( update(user.accessToken, formData) )
    }


    useEffect(() => {
        // console.log(isError, isSuccess)
        // if (isError) {
        //     setIsAlert(true)
        //     setAlertMessage(message)
        // }

        if (isSuccess) {
            console.log('update success')
            dispatch({ type: CLOSE_PROFILE })
        }

    }, [isLoading, isError, isSuccess, message, dispatch])

    return (
        <>
            <Dialog open={isProfileOpen} onClose={() => dispatch({ type: CLOSE_PROFILE }) } >
                <DialogTitle>
                        Profile
                        <IconButton sx={{
                                position: 'absolute',
                                yop: 8,
                                right: 8
                            }}
                            onClick={() => dispatch({ type: CLOSE_PROFILE }) }
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers>
                            <DialogContentText>
                                You can update your profile by updating these fields:
                            </DialogContentText>
                            <TextField margin="normal" variant="standard" fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                inputRef={refEmail}
                                defaultValue={user?.email}
                            />
                            <TextField margin="normal" variant="standard" fullWidth
                                id="username"
                                label="User Name"
                                type="text"
                                inputRef={refUsername}
                                inputProps={{ minLength: 2 }}
                                defaultValue={user?.username}
                            />
                            <TextField margin="normal" variant="standard" fullWidth
                                id="name"
                                label="Name"
                                type="text"
                                inputRef={refName}
                                inputProps={{ minLength: 2 }}
                                defaultValue={user?.name}
                            />
                            <TextField margin="normal" variant="standard" fullWidth
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                inputRef={refPassword}

                                inputProps={{ minLength: 6 }}
                                defaultValue={null}
                                InputProps={{
                                    endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickPassword} onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                }}
                            />
                            <TextField margin="normal" variant="standard" fullWidth
                                id="confirmPassword"
                                label="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                inputRef={refConfirmPassword}
                                inputProps={{ minLength: 6 }}
                                defaultValue={null}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickConfirmPassword} onMouseDown={handleMouseDownConfirmPassword}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <DialogContentText>
                                change avatar below:
                            </DialogContentText>
                            <Input sx={{ top: 10, bottom: 10 }} fullWidth
                                type='file'
                                placeholder="upload Avatar"
                                id='customFile'
                                onChange={onChangeFile}
                            />
                        </DialogContent>

                        <DialogActions sx={{ px: '19px' }}>
                        <Button type="submit" variant="contained" endIcon={<Send />}>
                            Update
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
        </>
    )
}

export default UserProfile
