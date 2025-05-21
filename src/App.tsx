import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
<<<<<<< HEAD
// @ts-ignore
import './App.css';
<<<<<<< HEAD
import NavBar from './components/organisms/NavBar';
import DecorativePenas from './components/molecules/DecorativeFeathers.tsx';
=======
import NavBar from './components/NavBar';
>>>>>>> cc6508f (feat: Add main application pages and user context management)
=======
import './App.css';
import NavBar from './components/NavBar';
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
import Home from './pages/Home.tsx';
import Sobre from "./pages/Sobre.tsx";
import Contato from './pages/Contato.tsx';
import Login from './pages/Login';
<<<<<<< HEAD
<<<<<<< HEAD
import Registro from './pages/Registro';
import Perfil from "./pages/Perfil.tsx";
import Pontos from "./pages/Pontos.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./utils/context/userContext.tsx";
import {toggleClassOnHtml} from "./utils/theme/themeSystems.tsx";
import Administrador from "./pages/Administrador.tsx";
import Footer from "./components/organisms/Footer.tsx";
import ResetarSenha from "./pages/ResetarSenha.tsx";
import HelpSystem from './components/organisms/HelpSystem.tsx';
=======
=======
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
import Perfil from "./pages/Perfil.tsx";
import Pontos from "./pages/Pontos.tsx";
import Configuracoes from "./pages/Configuracoes.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./utils/userContext.tsx";
import {toggleClassOnHtml} from "./utils/themeSystems.tsx";
import Administrador from "./pages/Administrador.tsx";
import Footer from "./components/Footer.tsx";
import ResetarSenha from "./pages/ResetarSenha.tsx";
<<<<<<< HEAD
>>>>>>> cc6508f (feat: Add main application pages and user context management)
=======
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)

function App() {

  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [isDown, setIsDown] = useState(false);
=======
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)

  const location = useLocation();
  const navigate = useNavigate();

  const { tema, setTema, usuario } = useContext(UserContext);

  useEffect(() => {
    if (!usuario && (location.pathname === "/perfil" ||
        location.pathname === "/pontos" ||
<<<<<<< HEAD
=======
        location.pathname === "/configuracoes" ||
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
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

<<<<<<< HEAD
  useEffect(() => {
    // Controle do scroll apenas para a Home
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

=======
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
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
<<<<<<< HEAD
<<<<<<< HEAD
      <main className={`appMain display-flex-center bg-secondary ${tema} ${location.pathname === "/login" ? "login" : ""} ${location.pathname === "/registro" ? "registro" : ""}`}>
=======
      <main className={`appMain display-flex-center bg-secondary px-1 ${tema} ${location.pathname === "/login" ? "login" : ""}`}>
>>>>>>> cc6508f (feat: Add main application pages and user context management)
=======
      <main className={`appMain display-flex-center bg-secondary px-1 ${tema} ${location.pathname === "/login" ? "login" : ""}`}>
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)

        <div className={"page-loader"}>
          {(loading) && (
              <div id="loader">
                <div className="loader"/>
              </div>
          )}
        </div>
<<<<<<< HEAD
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && location.pathname !== "/registro" && <NavBar/>}
        
        {(location.pathname === "/" || location.pathname === "/sobre" || location.pathname === "/contato") && (
          <DecorativePenas isDown={location.pathname === "/" ? isDown : false} />
        )}

        {(usuario && <HelpSystem/>)}
        
=======
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && <NavBar/>}
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="/contato" element={<Contato/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/pontos" element={<Pontos/>}/>
<<<<<<< HEAD
          <Route path="/administrador" element={<Administrador/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path={"resetar-senha"} element={<ResetarSenha/>}/>
        </Routes>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && location.pathname !== "/registro" &&<Footer/>}
=======
          <Route path="/configuracoes" element={<Configuracoes/>}/>
          <Route path="/administrador" element={<Administrador/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path={"resetar-senha"} element={<ResetarSenha/>}/>
        </Routes>
        {location.pathname !== "/login" && location.pathname !== "/resetar-senha" && <Footer/>}
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
      </main>
  );
}

export default App;