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

import { themeSettings } from './theme'
import NavBar from './component/navbar/NavBar'

import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'

import { Landing as ProjectLanding } from './page/project/Landing'
import { List as ProjectList } from './page/project/List'
import { Add as ProjectAdd } from './page/project/Add'
import { Info as ProjectInfo } from './page/project/Info'

import { Activity as ProjectActivity } from './page/activity/Activity'

const App = () => {
    const mode = useSelector((state) => state.setting.mode)
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return (
        <div className='App'>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="/project" element={<ProjectLanding />} />
                        <Route path="/project/list" element={<ProjectList />} />
                        <Route path="/project/add" element={<ProjectAdd />} />
                        <Route path="/project/:id" element={<ProjectInfo />} />

                        <Route path="/activity/:projectId" element={<ProjectActivity />} />

                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
