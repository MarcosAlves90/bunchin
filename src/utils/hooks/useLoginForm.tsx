import { useState, useEffect } from "react";
import axios from "axios";
import { Usuario } from "../../types/interfaces";

export default function useLoginForm(
    API_URL: string,
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>,
    navigate: (path: string) => void
) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handlePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };
    
    const handleLoginButtonClick = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        if (!email || !senha) {
            setError("Preencha todos os campos");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}login`, { email, senha });
            if (response.data.status === 1) {
                setUsuario(response.data.funcionario);
                localStorage.setItem("usuario", JSON.stringify(response.data.funcionario));
                setSenha(""); // Limpa a senha do state após login
                if (response.data.funcionario.status === "1") {
                    navigate('/pontos');
                } else {
                    navigate('/resetar-senha');
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Erro ao tentar fazer login");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        loading,
        passwordVisibility,
        handlePasswordVisibility,
        handleLoginButtonClick,
    };
}
