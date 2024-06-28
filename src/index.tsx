import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material'

import { appRoutes } from 'routes'
import { theme } from './theme'
import { AppContainer } from './layouts/app-container/app-container'
import { appInitializer } from './app-initializer'

import './index.scss'

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

appInitializer()

root.render(
  <StyledEngineProvider injectFirst>
    <ToastContainer pauseOnHover={false} hideProgressBar={true} autoClose={3000} pauseOnFocusLoss={false} position="bottom-right" />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppContainer routes={appRoutes} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
)
