import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import MenuItem from './components/layouts/Menu.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuItem/>
    <Toaster expand={true} richColors position="top-right" />
    <App />
  </StrictMode>,
)
