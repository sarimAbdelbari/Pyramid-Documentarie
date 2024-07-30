import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/themeProvider';
import { ContextProvider } from './contexts/ContextProvider';
// import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ThemeProvider>
    <ContextProvider>
    <App />
    </ContextProvider>,
   </ThemeProvider>
  </React.StrictMode>

  
);

