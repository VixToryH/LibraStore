import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventoryProvider } from './store/InventoryContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </StrictMode>,
)
