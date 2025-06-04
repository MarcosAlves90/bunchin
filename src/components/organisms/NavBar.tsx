import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext";
import { changeTheme } from "../../utils/theme/themeSystems";

interface NavLink {
    to: string;
    label: string;
}

interface Usuario {
    id: string;
    nome: string;
    email: string;
    funcao?: string;
}

interface UserContextType {
    tema: string;
    setTema: (tema: string) => void;
    usuario?: Usuario | null;
}

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { tema, setTema, usuario } = useContext(UserContext) as UserContextType;

    const handleThemeChange = () => changeTheme(tema, setTema);
    const handleLogoClick = () => navigate('/');
    
    const renderLinks = (links: NavLink[]) => (
        <ul className="navbar__container__nav gap-4 flex items-center justify-center">
            {links.map(({ to, label }: NavLink) => (
                <Link
                    key={to}
                    className={`nav-link text-lg relative ${
                        location.pathname === to ? "text-primary" : "text-secondary"
                    } hover:text-primary transition-colors duration-300 
                    after:content-[''] after:absolute after:bottom-[-3px] after:left-0 
                    after:h-[0.1rem] after:bg-primary after:transition-all 
                    after:duration-300 after:ease-out ${
                        location.pathname === to 
                            ? "after:w-full" 
                            : "after:w-0 hover:after:w-full"
                    }`}
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
        { to: "/contato", label: "Contate-nos" }
    ];

    const userLinks: NavLink[] = [
        { to: "/perfil", label: "Perfil" },
        { to: "/pontos", label: "Pontos" },
        { to: "/configuracoes", label: "Configurações" },
        ...(usuario?.funcao === "administrador" ? [{ to: "/administrador", label: "Painel de Controle" }] : [])
    ];

    return (
        <nav className={`navbar !fixed top-0 right-0 left-0 z-50 box-border flex h-[calc(90px-1rem)] w-full items-center justify-center transition duration-200`}>
            <div className="navbar__container box-border flex h-full w-full items-center justify-between bg-highlight p-0 px-2">
                <div
                    className="navbar__container__logo-wrapper text-secondary hover:text-primary"
                >
                    <img
                        src="https://res.cloudinary.com/dflvo098t/image/upload/logo_fs9l85.svg"
                        alt="Logo Bunchin"
                        className={`navbar__container__logo-wrapper__logo transition duration-200 h-[50px] cursor-pointer ${tema === "dark" ? "invert" : ""}`}
                        onClick={handleLogoClick}
                        style={{ minWidth: '50px', minHeight: '50px' }}
                    />
                </div>
                {usuario ? renderLinks(userLinks) : renderLinks(guestLinks)}
                <div className="navbar__container__theme-icon-box flex items-center justify-center h-[50px] w-[50px]">
                    <img
                        className={`navbar__container__theme-icon-box__icon ${tema === "dark" ? "h-[35px]" : "h-[40px]"} hover:scale-110 cursor-pointer transition duration-200 hover:invert-1`}
                        onClick={handleThemeChange}
                        src={tema === "light" ? "https://res.cloudinary.com/dflvo098t/image/upload/light_theme_icon_m1lowa.svg" : "https://res.cloudinary.com/dflvo098t/image/upload/dark_theme_icon_tdd4po.svg"}
                        alt="Botão para mudança de tema"
                    />
                </div>
            </div>
        </nav>
    );
}
