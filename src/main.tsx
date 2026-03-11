import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import VailLandingPage from './pages/Vail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VailLandingPage />
  </StrictMode>,
)
