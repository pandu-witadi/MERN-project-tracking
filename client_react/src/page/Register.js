//
//
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Grid,
    Link,
    Box,
    Stack,
    Alert,
    AlertTitle,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    InputAdornment,
    IconButton,
    Collapse,
    Input
} from '@mui/material'
import {
    Send,
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

import Loader from '../component/Loader'
import { reset, register } from '../store/action/auth'



const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = (e) => e.preventDefault()
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const handleClickConfirmPassword = () => setConfirmShowPassword(!showConfirmPassword)
    const handleMouseDownConfirmPassword = (e) => e.preventDefault()

    const [userData, setUserData] = useState({
    	email: '',
        username: '',
        name: '',
    	password: '',
        confirmPassword: ''
    })
    const { email, password, username, name, confirmPassword } = userData

    const onChange = (e) => {
		setUserData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
    }

    const [file, setFile] = useState(null)
    const [filename, setFilename] = useState(null)

    const onChangeFile = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const  { isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth )
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setIsAlert(true)
            setAlertMessage('password not match')
        } else {
            let formData = new FormData()
            formData.append('email', userData.email)
            formData.append('password', userData.password)
            formData.append('username', userData.username)
            formData.append('name', userData.name)
            if (file)
                formData.append('file', file)

            // Display the key/value pairs
            for (var pair of formData.entries())
                console.log(pair[0]+ ', ' + pair[1])

            dispatch( register(formData)  )
        }
    }

    useEffect(() => {
        if (isSuccess) {
            console.log('register success')
            dispatch( reset() )
            navigate('/login')
        }
        if (isError) {
            setIsAlert(true)
            setAlertMessage(message)
        }
    }, [isLoading, isError, isSuccess, message, navigate, dispatch])

    return (
        <>
            { isLoading && <Loader /> }
            <Container maxWidth="sm">
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    style={{ minHeight: "100vh" }}
                >
                    <Paper sx={{ padding: 5, elevation: 5 }}>
                        { isAlert  &&
                            <Collapse in={isAlert}>
                    			<Stack sx={{ width: '100%' }} spacing={2}>
                          			<Alert severity="error" onClick={() => {setIsAlert(false)}} >
                            			<AlertTitle>Error</AlertTitle>
                            			{ alertMessage }
                          			</Alert>
                    			</Stack>
                            </Collapse>
                		}
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Register</DialogTitle>
                            <DialogContent dividers>
                                <DialogContentText>
                                    Please fill your information in the fields below:
                                </DialogContentText>
                                <TextField margin="normal" variant="standard" fullWidth required
                                    id="email"
                                    label="Email"
                                    type="email"


                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                                <TextField margin="normal" variant="standard" fullWidth required
                                    id="username"
                                    label="User Name"
                                    type="text"

                                    name='username'
                                    value={username}
                                    onChange={onChange}

                                    inputProps={{ minLength: 2 }}
                                />
                                <TextField margin="normal" variant="standard" fullWidth required
                                    id="name"
                                    label="Name"
                                    type="text"

                                    name='name'
                                    value={name}
                                    onChange={onChange}

                                    inputProps={{ minLength: 2 }}
                                />

                                <TextField  margin="normal" variant="standard" fullWidth required
                                    id="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}

                                    name='password'
                                    value={password}
                                    onChange={onChange}

                                    inputProps={{ minLength: 6 }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickPassword} onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField margin="normal" variant="standard" fullWidth required
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}

                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={onChange}

                                    inputProps={{ minLength: 6 }}
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
                                    Please upload avatar below:
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
                                    Submit
                                </Button>
                            </DialogActions>
                        </form>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 2 }} >
                            Already have an account ? &nbsp;
                            <Link href={'/login'}  underline="hover" color="secondary">Login</Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 2 }} >
                            Back to  &nbsp;
                            <Link href={'/'} underline="hover" color="secondary">Home</Link>
                        </Box>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}

export default Register
