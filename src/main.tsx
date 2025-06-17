import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./utils/context/userContext.tsx";
import './utils/services/axiosConfig';
// @ts-ignore
import './index.css'
// @ts-ignore
import './assets/tailwind.css';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import './assets/animations.css'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Raiz do site não encontrada.");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
