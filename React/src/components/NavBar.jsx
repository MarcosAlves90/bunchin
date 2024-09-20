import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useContext, useEffect} from "react";
import {UserContext} from "../assets/ContextoDoUsuario";

export default function NavBar() {

    const location = useLocation();

    const { tema, setTema } = useContext(UserContext);

    useEffect(() => {

    }, []);

    function handleThemeChange() {
        if (tema === "light") {
            setTema("dark");
            toggleClassOnBody("root-light", "root-dark");
        } else {
            setTema("light");
            toggleClassOnBody("root-dark", "root-light");
        }
    }

    function toggleClassOnBody(removeClass, addClass) {
        document.body.classList.remove(removeClass);
        document.body.classList.add(addClass);
    }

    return (
        <nav className={`navbar navbar-expand-lg ${tema}`}>
            <div className="container-fluid">
                <img className='navbar-logo' src='/logo.svg' alt={"Logo do site"}/>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> 
                {location.pathname === '/' && 
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/sobre">Sobre</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/">Início</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/contato">Contate-nos</Link>
                        </li>
                    </ul>
                </div>}
                {location.pathname !== '/' && 
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/perfil">Perfil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/registros">Registros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/configuracoes">Configurações</Link>
                        </li>
                    </ul>
                </div>}
                <img className='navbar-theme-icon'
                     onClick={handleThemeChange}
                     src={tema === "light" ? "/light_theme_icon.svg" : "/dark_theme_icon.svg"}
                     alt={"Botão para mudança de tema"}/>
            </div>
        </nav>
    )
}