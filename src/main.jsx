import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

const theme = createTheme({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
