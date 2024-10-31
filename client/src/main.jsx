import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { ContextProvider } from '@/contexts/ContextProvider';
import { ThemeProvider } from '@/contexts/themeProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <BrowserRouter>
    <ThemeProvider>
     <App />
   </ThemeProvider>
     </BrowserRouter>

    </ContextProvider>
  </React.StrictMode>,
)
