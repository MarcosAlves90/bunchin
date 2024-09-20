import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./assets/ContextoDoUsuario.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
