import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
// @ts-ignore
import './App.css';
import NavBar from './components/organisms/NavBar';
import DecorativePenas from './components/molecules/DecorativeFeathers.tsx';
import LoginFeathers from './components/molecules/LoginFeathers.tsx';
import Home from './pages/Home.tsx';
import Sobre from "./pages/Sobre.tsx";
import Contato from './pages/Contato.tsx';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from "./pages/Perfil.tsx";
import Projetos from "./pages/Projetos.tsx";
import Pontos from "./pages/Pontos.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./utils/context/userContext.tsx";
import {toggleClassOnHtml} from "./utils/theme/themeSystems.tsx";
import Administrador from "./pages/Administrador.tsx";
import Footer from "./components/organisms/Footer.tsx";
import ResetarSenha from "./pages/ResetarSenha.tsx";
import HelpSystem from './components/organisms/HelpSystem.tsx';
import Faq from './pages/Faq.tsx';

function App() {

  const [loading, setLoading] = useState(true);
  const [isDown, setIsDown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { tema, setTema, usuario } = useContext(UserContext);

  useEffect(() => {
    if (!usuario && (location.pathname === "/perfil" ||
        location.pathname === "/pontos" ||
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

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        setIsDown(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsDown(false);
    }
  }, [location.pathname]);

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
      <main className={`appMain display-flex-center bg-secondary ${tema} ${location.pathname === "/login" || location.pathname === "/registro" ? "login" : ""}`}>

        <div className={"page-loader"}>
          {(loading) && (
              <div id="loader">
                <div className="loader"/>
              </div>
          )}
        </div>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && location.pathname !== "/registro" && <NavBar/>}        {(location.pathname === "/" || location.pathname === "/sobre" || location.pathname === "/contato" || location.pathname === "/faq") && (
          <DecorativePenas isDown={location.pathname === "/" ? isDown : false} />
        )}

        {(location.pathname === "/login" || location.pathname === "/registro" || location.pathname === "/resetar-senha") && (
          <LoginFeathers />
        )}

        {(usuario && <HelpSystem/>)}
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="/contato" element={<Contato />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/projetos" element={<Projetos/>}/>
          <Route path="/pontos" element={<Pontos/>}/>
          <Route path="/administrador" element={<Administrador/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path={"/resetar-senha"} element={<ResetarSenha/>}/>
        </Routes>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && location.pathname !== "/registro" && <Footer/>}
      </main>
  );
}

export default App;