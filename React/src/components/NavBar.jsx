import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario";
import {changeTheme} from "../systems/ThemeSystems.jsx";

export default function NavBar() {

    const navigate = useNavigate();

    const { tema, setTema, usuario } = useContext(UserContext);

    function handleThemeChange() {
        changeTheme(tema, setTema);
    }

    function handleLogoClick() {
        navigate('/');
    }

    return (
        <nav className={`navbar navbar-expand-lg ${tema}`}>
            <div className="container-fluid">
                <img className='navbar-logo' onClick={handleLogoClick} src='/logo.svg' alt={"Logo do site"}/>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> 
                {usuario === null &&
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
                {usuario !== null &&
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/*<li className="nav-item">*/}
                        {/*    <Link className='nav-link' to="/perfil">Perfil</Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link className='nav-link' to="/pontos">Pontos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to="/configuracoes">Configurações</Link>
                        </li>
                        {usuario.funcao === "administrador" && <li className="nav-item">
                            <Link className='nav-link' to="/administrador">Painel de Controle</Link>
                        </li>}
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