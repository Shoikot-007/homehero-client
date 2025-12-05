import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Routes from './routes/Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes />
    </AuthProvider>
  </StrictMode>,
)