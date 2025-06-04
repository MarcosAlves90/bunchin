import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./utils/context/userContext.tsx";
// @ts-ignore
import './index.css'
// @ts-ignore
import './assets/tailwind.css';
// @ts-ignore
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
