import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#465de4',
      main: '#465de4',
      dark: '#465de4',
    },
    secondary: {
      light: '#111',
      main: '#111',
      dark: '#111',
    },
    info: { 
      light: '#0288d1',
      main: '#0288d1',
      dark: '#0288d1',
    }
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
          textTransform: 'none',
        },
        contained: {
          opacity: 1.0,
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
          ":hover": {
            boxShadow: 'none',
          }
        },
      },
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