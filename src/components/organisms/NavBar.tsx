import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { UserContext } from "../../utils/context/userContext";
import { UserContextType, NavLink } from "../../types/interfaces";
import ThemeDropdown from "../atoms/ConfigButton";
import { Menu, X } from 'lucide-react';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { tema, usuario } = useContext(UserContext) as UserContextType;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogoClick = () => navigate('/');
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const closeMenu = () => setIsMenuOpen(false);    const renderLinks = (links: NavLink[], isMobile: boolean = false) => (
        <ul className={`navbar__container__nav gap-1 flex items-center justify-center ${isMobile ? 'flex-col w-full' : ''}`}>
            {links.map(({ to, label }: NavLink) => (
                <Link
                    key={to}
                    className={`nav-link text-lg relative ${
                        location.pathname === to ? "text-primary border-primary" : ""
                    } text-card transition-colors duration-300 px-2 py-[0.2rem] rounded-sm whitespace-nowrap ${isMobile ? 'w-full text-center px-2 py-[0.7rem] text-lg border-card border-2' : 'hover:text-primary hover:bg-tertiary'}`}
                    to={to}
                    onClick={isMobile ? closeMenu : undefined}
                >
                    {label}
                </Link>
            ))}
        </ul>
    );

    const guestLinks: NavLink[] = [
        { to: "/", label: "Início" },
        { to: "/sobre", label: "Sobre" },
        { to: "/contato", label: "Contato" },
        { to: "/faq", label: "FAQ" },
    ];

    const userLinks: NavLink[] = [
        { to: "/perfil", label: "Usuário" },
        { to: "/pontos", label: "Pontos" },
        {to: "/projetos", label: "Projetos"},
        ...(usuario?.funcao === "administrador" ? [{ to: "/administrador", label: "Painel de Controle" }] : [])
    ];    return (
        <>
            <nav className={`navbar !fixed top-0 right-0 left-0 z-50 box-border flex h-[calc(90px-1rem)] w-full items-center justify-center transition duration-200`}>
                <div className="navbar__container bg-secondary/80 backdrop-blur-3xl border-tertiary border-b-1 box-border flex h-full w-full items-center justify-between p-0 px-2">
                    {/* Logo - lado esquerdo */}
                    <div className="navbar__container__logo-wrapper flex items-center justify-start text-secondary hover:text-primary flex-shrink-0">
                        <img
                            src="https://res.cloudinary.com/dflvo098t/image/upload/logo_fs9l85.svg"
                            alt="Logo Bunchin"
                            className={`navbar__container__logo-wrapper__logo transition duration-200 h-[50px] cursor-pointer ${tema === "light" ? "invert" : ""} hover:scale-110 transition duration-200`}
                            onClick={handleLogoClick}
                            style={{ minWidth: '50px', minHeight: '50px' }}
                        />
                    </div>

                    {/* Links desktop - ocultos em mobile */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
                        {usuario ? renderLinks(userLinks) : renderLinks(guestLinks)}
                    </div>
                    
                    {/* Botões de ação desktop - lado direito */}
                    <div className="navbar__container__theme-icon-box gap-1 hidden lg:flex items-center justify-end flex-shrink-0">
                        {!usuario && (
                            <>
                                <Link
                                    className={`nav-link text-lg text-card border-2 border-transparent hover:text-primary hover:bg-tertiary hover:border-tertiary transition-colors duration-300 px-2 py-[0.2rem] rounded-sm`}
                                    to={"/login"}
                                >
                                    Login
                                </Link>
                                <Link
                                    className={`nav-link text-lg text-secondary bg-highlight border-2 border-highlight hover:bg-primary hover:border-primary transition-colors duration-300 px-2 py-[0.2rem] rounded-sm`}
                                    to={"/registro"}
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                        <ThemeDropdown />
                    </div>

                    {/* Menu hambúrguer mobile */}
                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeDropdown />
                        <button
                            onClick={toggleMenu}
                            className={`flex justify-center items-center gap-0.5 h-[38.4px] w-[38.4px] rounded-sm cursor-pointer border-2 p-[0.2rem] text-lg transition-colors duration-200 hover:text-card hover:border-card ${isMenuOpen ? "text-card border-card" : "text-highlight border-highlight"}`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className={`h-1.5 w-1.5 transition duration-200`} /> : <Menu className={`h-1.5 w-1.5 transition duration-200`} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menu mobile overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeMenu}
                    />
                    
                    {/* Menu content */}
                    <div className="absolute top-[calc(90px-1rem)] left-0 right-0 bg-secondary/95 backdrop-blur-3xl border-b border-tertiary shadow-lg">
                        <div className="flex flex-col p-2 space-y-1">
                            {/* Navigation Links */}
                            {usuario ? renderLinks(userLinks, true) : renderLinks(guestLinks, true)}
                            
                            {/* Auth buttons for guests */}
                            {!usuario && (
                                <div className="flex flex-col gap-1 mt-1 pt-1 border-t border-tertiary">
                                    <Link
                                        className="border-2 border-card transition text-lg px-2 py-[0.7rem] rounded-sm text-card cursor-pointer font-medium"
                                        to="/login"
                                        onClick={closeMenu}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        className="border-2 border-highlight transition text-lg px-2 py-[0.7rem] rounded-sm bg-highlight text-secondary cursor-pointer font-medium w-full"
                                        to="/registro"
                                        onClick={closeMenu}
                                    >
                                        Registro
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
