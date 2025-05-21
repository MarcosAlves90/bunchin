import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home.tsx';
import Sobre from "./pages/Sobre.tsx";
import Contato from './pages/Contato.tsx';
import Login from './pages/Login';
import Perfil from "./pages/Perfil.tsx";
import Pontos from "./pages/Pontos.tsx";
import Configuracoes from "./pages/Configuracoes.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./utils/userContext.tsx";
import {toggleClassOnHtml} from "./utils/themeSystems.tsx";
import Administrador from "./pages/Administrador.tsx";
import Footer from "./components/Footer.tsx";
import ResetarSenha from "./pages/ResetarSenha.tsx";

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
      toggleClassOnHtml("light", "dark");
    } else {
      setTema("light");
      toggleClassOnHtml("dark", "light");
    }
    setLoading(false);
    console.log("Bunchin: tema carregado.");
  }

  return (
      <main className={`appMain display-flex-center bg-secondary px-1 ${tema} ${location.pathname === "/login" ? "login" : ""}`}>

        <div className={"page-loader"}>
          {(loading) && (
              <div id="loader">
                <div className="loader"/>
              </div>
          )}
        </div>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && <NavBar/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="/contato" element={<Contato/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/pontos" element={<Pontos/>}/>
          <Route path="/configuracoes" element={<Configuracoes/>}/>
          <Route path="/administrador" element={<Administrador/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path={"resetar-senha"} element={<ResetarSenha/>}/>
        </Routes>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && <Footer/>}
      </main>
  );
}

export default App;