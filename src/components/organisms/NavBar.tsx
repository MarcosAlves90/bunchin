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
                    after:h-[0.rem] after:bg-primary after:transition-all 
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
                    <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        xmlns="http://www.w3.org/2000/svg"
                        className="navbar__container__logo-wrapper__logo transition duration-200 h-[50px] cursor-pointer"
                        onClick={handleLogoClick}
                        style={{ minWidth: '50px', minHeight: '50px' }}
                    >
                        <rect x="30.7626" width="2.12156" height="7" fill="currentColor" />
                        <rect x="30.7626" y="53" width="2.12156" height="7" fill="currentColor" />
                        <rect width="2.09183" height="7.10875" transform="matrix(0.878333 -0.47805 0.522276 0.852777 14.8508 4.5)" fill="currentColor" />
                        <rect width="2.09183" height="7.10875" transform="matrix(0.878333 -0.47805 0.522276 0.852777 42.9615 50.5)" fill="currentColor" />
                        <rect y="31" width="2" height="7.42546" transform="rotate(-90 0 31)" fill="currentColor" />
                        <rect width="2.09183" height="7.10875" transform="matrix(0.878333 0.47805 -0.522276 0.852777 18.5637 49.5)" fill="currentColor" />
                        <rect width="2.03107" height="7.32141" transform="matrix(0.522276 -0.852777 0.878333 0.47805 3.71277 15.7321)" fill="currentColor" />
                        <rect width="2.03107" height="7.32141" transform="matrix(0.522276 0.852777 -0.878333 0.47805 10.1433 40.5)" fill="currentColor" />
                        <rect width="2.03107" height="7.32141" transform="matrix(0.522276 -0.852777 0.878333 0.47805 52.5086 42.2321)" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M39.0657 18.4512L39.0596 18.4654L47.6189 11.5H57.2822L49.0399 18.1212C49.1242 19.0035 49.1446 19.9379 49.0962 20.9253C49.0962 29.0914 44.2846 35.1811 34.099 35.1811C32.544 35.1811 31.1287 35.0798 29.8428 34.8856L13.7902 38.7314L39.0657 18.4512Z" fill="currentColor" />
                    </svg>
                </div>
                {usuario ? renderLinks(userLinks) : renderLinks(guestLinks)}
                <div className="navbar__container__theme-icon-box flex items-center justify-center h-[50px] w-[50px]">
                    <img
                        className={`navbar__container__theme-icon-box__icon h-[40px] cursor-pointer transition duration-200 hover:invert-1`}
                        onClick={handleThemeChange}
                        src={tema === "light" ? "/light_theme_icon.svg" : "/dark_theme_icon.svg"}
                        alt="Botão para mudança de tema"
                    />
                </div>
            </div>
        </nav>
    );
}
