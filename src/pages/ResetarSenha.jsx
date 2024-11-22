import { useState, useEffect, useContext } from "react";
import validator from "validator";
import { SendEmail } from "../systems/SendEmail.jsx";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { useNavigate } from "react-router-dom";

export default function ResetarSenha() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [resetCode, setResetCode] = useState(null);
    const [isValidCode, setIsValidCode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { tema, usuario, setUsuario } = useContext(UserContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('codigo');
        if (code) {
            setResetCode(code);
            verifyResetCode(code);
        }
    }, []);

    const verifyResetCode = async (codigo) => {
        try {
            const { data } = await axios.post(`http://localhost:80/api/verifyResetCode`, { codigo });
            if (data && data.valid) {
                setIsValidCode(true);
            } else {
                setError("Código inválido.");
            }
        } catch (error) {
            setError("Erro ao verificar o código.");
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const { data } = await axios.post(`http://localhost:80/api/checkEmailExists`, { email });
            return data && Object.keys(data).length > 0;
        } catch (error) {
            return false;
        }
    };

    const storeResetCode = async (email, code) => {
        const { data } = await axios.post(`http://localhost:80/api/checkEmailExists`, { email });
        const { n_registro: funcionarioId, nome: funcionarioNome } = data;
        const responseLink = await axios.post(`http://localhost:80/api/storeResetCode`, {
            email, codigo: code, funcionario_id: funcionarioId
        });
        return { ok: responseLink.status === 200, nome: funcionarioNome };
    };

    const sendEmail = async () => {
        if (email !== confirmEmail) return setError("Os emails não coincidem.");
        if (!validator.isEmail(validator.normalizeEmail(email))) return setError("Email inválido.");

        const emailExists = await checkEmailExists(email);
        if (!emailExists) return setError("Email não encontrado.");

        const resetCode = uuidv4();
        const { ok: codeStored, nome: funcionarioNome } = await storeResetCode(email, resetCode);
        if (!codeStored) return setError("Erro ao gerar o código de redefinição.");

        setError("");
        const resetLink = `${window.location.href}?codigo=${resetCode}`;
        SendEmail(import.meta.env.VITE_PUBLIC_API_KEY_S,
            import.meta.env.VITE_SERVICE_API_KEY_S,
            import.meta.env.VITE_TEMPLATE_API_KEY_2_S, {
                email, link: resetLink, name: funcionarioNome
            });
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;

        if (password.length >= 6) strength += 1;
        if (password.length >= 10) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        return strength;
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate('/login');
    }

    const handlePasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        const apiEndpoint = usuario && usuario.status === 0 ? 'newPassword' : 'resetPassword';
        const payload = usuario && usuario.status === 0
            ? { n_registro: usuario.n_registro, senha: newPassword }
            : { codigo: resetCode, senha: newPassword };

        try {
            const response = await axios.put(`http://localhost:80/api/${apiEndpoint}`, payload);
            if (response.data.status === 1) {
                setError("Senha alterada com sucesso.");
                if (apiEndpoint === 'newPassword') {
                    navigate("/pontos");
                } else {
                    handleLogout();
                }
            } else {
                setError("Erro ao alterar a senha.");
            }
        } catch (error) {
            setError("Erro ao alterar a senha.");
        }
    };

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(newPassword));
    }, [newPassword]);

    const getPasswordStrengthColor = () => {
        if (tema === "dark") {
            switch (passwordStrength) {
                case 6:
                    return "green";
                case 5:
                    return "lime";
                case 4:
                    return "yellow";
                case 3:
                    return "orange";
                default:
                    return "red";
            }
        } else {
            switch (passwordStrength) {
                case 6:
                    return "darkgreen";
                case 5:
                    return "green";
                case 4:
                    return "gold";
                case 3:
                    return "darkorange";
                default:
                    return "darkred";
            }
        }
    };

    if (resetCode && !isValidCode) {
        return <h1>404 - Código inválido</h1>;
    }

    const handleBackButtonClick = () => navigate("/login");

    return (
        <>
            <main className={`mainCommon resetPassword ${tema}`}>
                <div className="area">
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>

                    </ul>
                </div>
                <div className="animated-background"></div>
                <div className="cardBox">
                    <button className={"backArrow"} onClick={handleBackButtonClick}><i className="bi bi-arrow-left"></i>
                    </button>
                    <h1>Recuperar conta</h1>
                    {(resetCode && isValidCode) || (usuario && usuario.status === 0) ? (
                        <>
                            <p className={"p-title"}>Nova Senha</p>
                            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <div className="password-strength-bar" style={{
                                backgroundColor: getPasswordStrengthColor(),
                                width: `${(passwordStrength / 6) * 100}%`
                            }}></div>
                            <p className={"p-title"}>Confirme a Nova Senha</p>
                            <input type="text" value={confirmNewPassword}
                                   onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handlePasswordChange}>Redefinir Senha</button>
                        </>
                    ) : (
                        <>
                            <p className={"p-title"}>Email</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <p className={"p-title"}>Insira o email novamente</p>
                            <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)}/>
                            {error && <p className="error">{error}</p>}
                            <button onClick={sendEmail}>Enviar</button>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}