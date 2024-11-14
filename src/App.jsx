import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home.jsx';
import Sobre from "./pages/Sobre.jsx";
import Contato from './pages/Contato.jsx';
import Login from './pages/Login';
import Perfil from "./pages/Perfil.jsx";
import Pontos from "./pages/Pontos.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./assets/ContextoDoUsuario.jsx";
import {toggleClassOnBody} from "./systems/ThemeSystems.jsx";
import Administrador from "./pages/Administrador.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { tema, setTema, usuario } = useContext(UserContext);

  useEffect(() => {
    if (!usuario && (location.pathname === "/perfil" ||
        location.pathname === "/pontos" ||
        location.pathname === "/configuracoes" ||
        location.pathname === "/administrador")) {
      navigate('/login');
    }
  }, [location.pathname, usuario]);

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
      <main className={`appMain display-flex-center ${tema} ${location.pathname === "/login" ? "login" : ""}`}>

        <div className={"page-loader"}>
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
          <Route path="/pontos" element={<Pontos/>}/>
          <Route path="/configuracoes" element={<Configuracoes/>}/>
          <Route path="/administrador" element={<Administrador/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        {location.pathname !== "/login" && <Footer/>}
      </main>
  );
}

export default App;