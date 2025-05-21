import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./utils/userContext.tsx";
import './index.css'
import './assets/tailwind.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
