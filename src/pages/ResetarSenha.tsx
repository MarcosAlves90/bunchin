
import axios from "axios";
import validator from "validator";
import { useEffect, useContext } from "react";
import { SendEmail } from "../utils/sendEmail.jsx";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { useResetPasswordForm } from "../utils/useResetPasswordForm.jsx";

export default function ResetarSenha() {
    const navigate = useNavigate();
    const { tema, usuario, setUsuario, API_URL } = useContext(UserContext);
    const {
        email,
        setEmail,
        confirmEmail,
        setConfirmEmail,
        error,
        setError,
        resetCode,
        setResetCode,
        isValidCode,
        setIsValidCode,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        passwordStrength,
        checkEmailExists,
        storeResetCode,
        getPasswordStrengthColor,
    } = useResetPasswordForm(API_URL, usuario, setUsuario, navigate);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('codigo');
        if (code) {
            setResetCode(code);
            verifyResetCode(code);
        }
        // eslint-disable-next-line
    }, []);

    const verifyResetCode = async (codigo) => {
        try {
            const { data } = await axios.post(`${API_URL}verifyResetCode`, { codigo });
            if (data && data.valid) {
                setIsValidCode(true);
            } else {
                setError("Código inválido.");
            }
        } catch (error) {
            setError("Erro ao verificar o código.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate('/login');
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

    const handlePasswordChange = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        const n_registro = usuario && usuario.status === "0" ? usuario.n_registro : null;
        const apiEndpoint = usuario && usuario.status === "0" ? 'newPassword' : 'resetPassword';
        const payload = usuario && usuario.status === "0"
            ? { n_registro, senha: newPassword }
            : { codigo: resetCode, senha: newPassword };

        try {
            const response = await axios.put(`${API_URL}${apiEndpoint}`, payload);
            if (response.data.status === 1) {
                setError("Senha alterada com sucesso.");
                if (usuario && usuario.status === "0") {
                    navigate("/pontos");
                } else {
                    handleLogout();
                }
            } else {
                setError("Erro ao alterar a senha.");
            }
        } catch (err) {
            setError("Erro.");
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
                    {(resetCode && isValidCode) || (usuario && usuario.status === "0") ? (
                        <>
                            <p className={"p-title"}>Nova Senha</p>
                            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <div className="password-strength-bar" style={{
                                backgroundColor: getPasswordStrengthColor(),
                                width: `${(passwordStrength / 6) * 100}%`
                            }}></div>
                            <p className={"p-title"}>Confirme a Nova Senha</p>
                            <input type="text" value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            {error && <p className="error">{error}</p>}
                            <button onClick={handlePasswordChange}>Redefinir Senha</button>
                        </>
                    ) : (
                        <>
                            <p className={"p-title"}>Email</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p className={"p-title"}>Insira o email novamente</p>
                            <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                            {error && <p className="error">{error}</p>}
                            <button onClick={sendEmail}>Enviar</button>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}