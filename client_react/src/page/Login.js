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
    Collapse
} from '@mui/material'
import {
    Send,
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

import Loader from '../component/Loader'
import { login } from '../store/action/auth'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = (e) => e.preventDefault()

    const [formData, setFormData] = useState({
    	email: "",
    	password: ""
    })
    const { email, password } = formData

    const  { isLoading, isError, isSuccess, message } = useSelector( (state) =>  state.auth )
    const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch( login(formData)  )
    }

    useEffect(() => {
        if (isError) {
            setIsAlert(true)
            setAlertMessage(message)
        }

        if (isSuccess) {
            navigate('/')
        }

    }, [isLoading, isError, isSuccess, message, navigate, dispatch])

    return (
        <>
            { isLoading && <Loader /> }
            <Container maxWidth="sm" >
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    style={{ minHeight: "100vh" }}
                >
                    <Paper sx={{ padding: 5, elevation: 15 }} >
                        { isAlert  &&
                            <Collapse in={isAlert}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert
                                        severity="error"
                                        onClick={() => {setIsAlert(false)}}
                                    >
                                        <AlertTitle>Error</AlertTitle>
                                        { alertMessage }
                                    </Alert>
                                </Stack>
                            </Collapse>
                        }
                        <form onSubmit={handleSubmit} >
                            <DialogTitle>Login</DialogTitle>
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

                            </DialogContent>
                            <DialogActions sx={{ px: '19px' }}>
                                <Button type="submit" variant="contained" endIcon={<Send />}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </form>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 2 }} >
                            Don't have an account ? &nbsp;
                            <Link href={'/register'} underline="hover" color="secondary">Register</Link>
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

export default Login
