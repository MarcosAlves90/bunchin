import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext";
import { UserContextType, NavLink } from "../../types/interfaces";
import ThemeDropdown from "../atoms/ConfigButton";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { tema, usuario } = useContext(UserContext) as UserContextType;

    const handleLogoClick = () => navigate('/');
    
    const renderLinks = (links: NavLink[]) => (
        <ul className="navbar__container__nav gap-1 flex items-center justify-center">
            {links.map(({ to, label }: NavLink) => (
                <Link
                    key={to}
                    className={`nav-link text-lg relative ${
                        location.pathname === to ? "text-primary" : ""
                    } text-card hover:text-primary hover:bg-tertiary transition-colors duration-300 px-2 py-[0.2rem] rounded-sm`}
                    to={to}
                >
                    {label}
                </Link>
            ))}
        </ul>
    );

    const guestLinks: NavLink[] = [
        { to: "/sobre", label: "Sobre" },
        { to: "/", label: "Início" },
        { to: "/contato", label: "Contato" }
    ];

    const userLinks: NavLink[] = [
        { to: "/perfil", label: "Usuário" },
        { to: "/pontos", label: "Pontos" },
        ...(usuario?.funcao === "administrador" ? [{ to: "/administrador", label: "Painel de Controle" }] : [])
    ];

    return (
        <nav className={`navbar !fixed top-0 right-0 left-0 z-50 box-border flex h-[calc(90px-1rem)] w-full items-center justify-center transition duration-200`}>
            <div className="navbar__container bg-secondary/80 backdrop-blur-3xl border-tertiary border-b-1 box-border grid h-full w-full grid-cols-3 p-0 px-2">
                <div
                    className="navbar__container__logo-wrapper flex items-center justify-start text-secondary hover:text-primary"
                >
                    <img
                        src="https://res.cloudinary.com/dflvo098t/image/upload/logo_fs9l85.svg"
                        alt="Logo Bunchin"
                        className={`navbar__container__logo-wrapper__logo transition duration-200 h-[50px] cursor-pointer ${tema === "light" ? "invert" : ""} hover:scale-110 transition duration-200`}
                        onClick={handleLogoClick}
                        style={{ minWidth: '50px', minHeight: '50px' }}
                    />
                </div>
                {usuario ? renderLinks(userLinks) : renderLinks(guestLinks)}                
                <div className="navbar__container__theme-icon-box gap-1 flex items-center justify-end">
                    {!usuario && (
                        <>
                            <Link
                                className={`nav-link text-lg text-card border-2 border-transparent hover:text-primary hover:bg-tertiary hover:border-tertiary transition-colors duration-300 px-2 py-[0.2rem] rounded-sm w-con`}
                                to={"/login"}
                            >
                                Login
                            </Link>
                            <Link
                                className={`nav-link text-lg text-secondary bg-highlight border-2 border-highlight hover:bg-primary hover:border-primary transition-colors duration-300 px-2 py-[0.2rem] rounded-sm w-con`}
                                to={"/"}
                            >
                                Registro
                            </Link>
                        </>
                    )}
                    <ThemeDropdown />
                </div>
            </div>
        </nav>
    );
}
