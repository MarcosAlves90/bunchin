import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../assets/ContextoDoUsuario";
import { changeTheme } from "../systems/ThemeSystems.jsx";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { tema, setTema, usuario } = useContext(UserContext);

    const handleThemeChange = () => changeTheme(tema, setTema);
    const handleLogoClick = () => navigate('/');

    const renderLinks = (links) => (
        <ul className="navbar-nav">
            {links.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                    <Link className={`nav-link ${location.pathname === to ? "active" : ""}`} to={to}>{label}</Link>
                </li>
            ))}
        </ul>
    );

    const guestLinks = [
        { to: "/sobre", label: "Sobre" },
        { to: "/", label: "Início" },
        { to: "/contato", label: "Contate-nos" }
    ];

    const userLinks = [
        { to: "/perfil", label: "Perfil" },
        { to: "/pontos", label: "Pontos" },
        { to: "/configuracoes", label: "Configurações" },
        ...(usuario?.funcao === "administrador" ? [{ to: "/administrador", label: "Painel de Controle" }] : [])
    ];

    return (
        <nav className={`navbar navbar-expand-lg ${tema}`}>
            <div className="container-fluid">
                <img className='navbar-logo' onClick={handleLogoClick} src='/logo.svg' alt="Logo do site" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {usuario ? renderLinks(userLinks) : renderLinks(guestLinks)}
                </div>
                <div className="theme-icon-box display-flex-center">
                    <img className={`navbar-theme-icon ${tema}`} onClick={handleThemeChange} src={tema === "light" ? "/light_theme_icon.svg" : "/dark_theme_icon.svg"} alt="Botão para mudança de tema" />
                </div>
            </div>
        </nav>
    );
}