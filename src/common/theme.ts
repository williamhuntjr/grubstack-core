import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4e8ce1',
      main: '#4e8ce1',
      dark: '#4e8ce1',
    },
    secondary: {
      light: '#111',
      main: '#111',
      dark: '#111',
    },
    info: { 
      light: '#4e8ce1',
      main: '#4e8ce1',
      dark: '#4e8ce1',
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