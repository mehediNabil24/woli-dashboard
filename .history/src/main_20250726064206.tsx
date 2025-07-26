import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { Menu } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Menu/>
    <Toaster expand={true} richColors position="top-right" />
    <App />
  </StrictMode>,
)
