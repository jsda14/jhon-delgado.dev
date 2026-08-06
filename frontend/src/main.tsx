import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/variables.css'
import '@/styles/global.css'
import { LocaleProvider } from '@/context/LocaleContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
