import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser'; // - Não está sendo usado porque troquei pelo Home temporariamente.
import NavBar from './components/NavBar';
import Home from './pages/Home.jsx';
import Sobre from "./pages/Sobre.jsx";
import Contato from './pages/Contato.jsx';
import Login from './pages/Login';
import Perfil from "./pages/Perfil.jsx";
import Registros from "./pages/Registros.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import {useContext} from "react";
import {UserContext} from "./assets/ContextoDoUsuario.jsx";

function App() {

  const location = useLocation();

  const { tema } = useContext(UserContext);

  return (
    <main className={`appMain display-flex-center ${tema}`}>
      {/* <h5>React CRUD operations using PHP API and MySQL</h5> */}


      {/* <nav>
        <ul>
          <li>
            <Link to="/">List Users</Link>
          </li>
          <li>
            <Link to="user/create">Create User</Link>
          </li>
        </ul>
      </nav> */}
      {location.pathname !== "/login" && <NavBar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />}/>
        <Route path="/contato" element={<Contato/>}/>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/configuracoes" element={<Configuracoes />} />

        <Route path="/Login" element={<Login />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="user/:id/edit" element={<EditUser />} />

      </Routes>
    </main>
  );
}

export default App;