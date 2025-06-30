import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext.jsx'
import { SidebarProvider } from './components/Sidebar.jsx'
import { AppointmentsProvider } from './context/AppointmentsContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <NotesProvider>
          <AppointmentsProvider>
            <App />
          </AppointmentsProvider>
        </NotesProvider>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
