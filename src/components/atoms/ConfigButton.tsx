import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../utils/context/userContext";
import { UserContextType, ThemeOption } from "../../types/interfaces";
import { Cog, LogOut } from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function ThemeDropdown() {
    const { tema, setTema, usuario, setUsuario } = useContext(UserContext) as UserContextType;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const themeOptions: ThemeOption[] = [
        {
            value: "light",
            label: "Tema Claro",
            icon: "https://res.cloudinary.com/dflvo098t/image/upload/light_theme_icon_m1lowa.svg"
        },
        {
            value: "dark",
            label: "Tema Escuro",
            icon: "https://res.cloudinary.com/dflvo098t/image/upload/dark_theme_icon_tdd4po.svg"
        }    ];

    const nextTheme = themeOptions.find(option => option.value === (tema === "light" ? "dark" : "light"));    
    const handleThemeToggle = () => {
        const novoTema = tema === "light" ? "dark" : "light";
        setTema(novoTema);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(novoTema);
        localStorage.setItem("tema", novoTema);
        setIsOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate('/login');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex justify-center items-center gap-0.5 h-[38.4px] w-[38.4px] rounded-sm cursor-pointer border-2 p-[0.2rem] text-lg transition-colors duration-300 hover:text-primary hover:border-primary ${isOpen ? "text-primary border-primary" : "text-highlight border-highlight"}`}
                aria-label="Selecionar tema"
            >
                <Cog className={`h-1.5 w-1.5 transition duration-200 ${isOpen ? "rotate-90" : ""}`} />
            </button>            
            {isOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-15 bg-secondary/80 backdrop-blur-3xl border border-tertiary rounded-sm shadow-lg z-50 overflow-hidden text-card">
                    
                    <button
                        onClick={handleThemeToggle}
                        aria-label="Alternar tema"
                        className={`w-full flex items-center gap-1 px-1 py-0.5 text-left hover:bg-card hover:text-primary transition-colors duration-200 cursor-pointer ${usuario ? "border-b-1 border-tertiary" : ""}`}
                    >
                        <img
                            src={nextTheme?.icon}
                            alt={nextTheme?.label}
                            className={`${tema === "dark" ? "h-1.5 w-1.5" : "h-[1.3rem] w-[1.3rem] m-[0.1rem]"}`}
                        />
                        <span className="text-base">{nextTheme?.label}</span>
                    </button>
                    {
                        usuario && (
                            <button className="w-full flex items-center gap-1 px-1 py-0.5 text-left hover:bg-card hover:text-primary transition-colors duration-200 cursor-pointer text-red"
                                onClick={handleLogout}
                                aria-label="Sair da conta"
                            >
                                <LogOut className="h-1.5 w-1.5"/>
                                <span className="text-base">Sair</span>
                            </button>
                        )
                    }
                </div>
            )}
        </div>
    );
}
