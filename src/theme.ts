import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4e8ce1',
    },
    secondary: {
      main: '#111',
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
    },
    MuiTooltip: {
      styleOverrides: { 
        tooltip: {
            fontSize: "1em",
            backgroundColor: "#111",
        },
        arrow: {
          color: "#111",
        },
      }
    },
  }
})