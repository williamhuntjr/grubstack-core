import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material'

import { appRoutes } from 'routes'
import { appConfig } from 'common/config'

import { AppContainer } from './layouts/app-container/app-container'
import { appInitializer } from './app-initializer'

import './index.scss'

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

const theme = createTheme({
  palette: {
    primary: {
      main: '#465de4',
    },
    secondary: {
      main: '#282828',
    },
  },
  typography: {
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    fontFamily: [
      '"Roboto"',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-root": {
            borderRadius: 0,
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&.MuiInputBase-input": {
            padding: 8,
          }
        },
        root: {
          "&.MuiInputBase-root": {
            borderRadius: 0,
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          "&.MuiInputLabel-shrink": {
            top: '0px !important',
          }
        },
        outlined: {
          "&.MuiInputLabel-outlined": {
            top: '-8px',
          }
        },
      }
    },
    MuiFormHelperText: {
      styleOverrides: { 
        contained: {
          "&.MuiFormHelperText-contained": {
            marginLeft: '0px',
          }
        }
      }
    }
  }
})

appInitializer()

root.render(
  <StyledEngineProvider injectFirst>
    <ToastContainer 
      pauseOnHover={false}
      hideProgressBar={true}
      autoClose={3000}
      pauseOnFocusLoss={false}
      position="bottom-left"
    />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Auth0Provider
          domain={appConfig.authDomain}
          clientId={appConfig.authClientId}
          redirectUri={appConfig.siteUrl}
          audience="https://core-api.grubstack.app/v1"
          scope=""
        > 
          <Routes>
            <Route path="/*" element={<AppContainer routes={appRoutes} />}/>
          </Routes>
        </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
)