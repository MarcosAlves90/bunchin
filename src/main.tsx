import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import {UserProvider} from "./utils/context/userContext.tsx";
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
=======
import {UserProvider} from "./utils/userContext.tsx";
import './index.css'
import './assets/tailwind.css';

createRoot(document.getElementById('root')).render(
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
  <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
