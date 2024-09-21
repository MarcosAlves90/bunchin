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
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./assets/ContextoDoUsuario.jsx";
import {toggleClassOnBody} from "./systems/ThemeSystems.jsx";

function App() {

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const { tema, setTema } = useContext(UserContext);

  useEffect(() => {
    handleThemeLocalState();
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.add('disable-scroll');

    const timer = setTimeout(() => {
      htmlElement.classList.remove('disable-scroll');
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  function handleThemeLocalState() {
    const tema = localStorage.getItem("tema");
    if (tema === "dark") {
      setTema("dark");
      toggleClassOnBody("root-light", "root-dark");
    } else {
      setTema("light");
      toggleClassOnBody("root-dark", "root-light");
    }
    setLoading(false);
    console.log("Bunchin: tema carregado.");
  }

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
        <div>
          {(loading) && (
              <div id="loader">
                <div className="loader"/>
              </div>
          )}
        </div>
        {location.pathname !== "/login" && <NavBar/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="/contato" element={<Contato/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/registros" element={<Registros/>}/>
          <Route path="/configuracoes" element={<Configuracoes/>}/>

          <Route path="/Login" element={<Login/>}/>
          <Route path="user/create" element={<CreateUser/>}/>
          <Route path="user/:id/edit" element={<EditUser/>}/>

        </Routes>
      </main>
  );
}

export default App;