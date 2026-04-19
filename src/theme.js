import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22d3ee', // Cyan
      light: '#67e8f9',
      dark: '#0891b2',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f43f5e', // Rose
      light: '#fb7185',
      dark: '#e11d48',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000', // Pure OLED Black
      paper: '#09090b', // Subtle off-black for elevation
    },
    success: {
      main: '#10b981', // Emerald
    },
    warning: {
      main: '#f59e0b', // Amber
    },
    error: {
      main: '#ef4444', // Red
    },
    info: {
      main: '#6366f1', // Indigo
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    button: { fontWeight: 600, letterSpacing: '0.02em' },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
          backgroundImage: 'none',
          minHeight: '100vh',
          margin: 0,
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#000000',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#27272a',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#3f3f46',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(34, 211, 238, 0.3)',
            boxShadow: '0 8px 32px -8px rgba(34, 211, 238, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(9, 9, 11, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(0, 0, 0, 0.95)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          padding: '10px 24px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: '#22d3ee',
          color: '#000000',
          border: '1px solid #22d3ee',
          '&:hover': {
            background: '#67e8f9',
            borderColor: '#67e8f9',
            boxShadow: '0 0 16px rgba(34, 211, 238, 0.4)',
            transform: 'translateY(-1px)',
          }
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#09090b',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22d3ee', 
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              backgroundColor: '#000000',
              boxShadow: '0 0 0 2px rgba(34, 211, 238, 0.2)',
            }
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '16px 24px',
        },
        head: {
          fontWeight: 700,
          color: '#a1a1aa',
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#09090b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
        }
      }
    },
  },
});
