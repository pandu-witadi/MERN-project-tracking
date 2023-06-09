//
//
import { useMemo } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"

import { themeSettings } from "./theme"
import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'


const App = () => {
    const mode = useSelector((state) => state.setting.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className='App'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
