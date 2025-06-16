import axios from "axios";
import validator from "validator";
import { useEffect, useContext } from "react";
import { SendEmail } from "../utils/services/sendEmail.js";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../utils/context/userContext.js";
import { useNavigate } from "react-router-dom";
import { useResetPasswordForm } from "../utils/hooks/useResetPasswordForm.js";
import { Undo2 } from "lucide-react";

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
        return <h1 className="text-center text-2xl mt-10">404 - Código inválido</h1>;
    }

    const handleBackButtonClick = () => navigate("/login");

    return (
        <main className={`mainCommon resetPassword ${tema} min-h-screen flex flex-col !items-start bg-[var(--secondary)] relative`}>
            <div className="flex flex-col mb-1">
                <button onClick={handleBackButtonClick} aria-label="Voltar">
                    <Undo2
                        className={`mb-0 hover:!cursor-pointer`}
                        size={32}
                        color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                    />
                </button>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="bg-(--tertiary) text-(--primary) rounded-lg shadow-lg px-8 py-8 flex flex-col items-center gap-y-2 h-40 w-full relative">
                    <h1 className="text-2xl font-bold text-(--primary) font-(family-name:--font-subrayada)">Recuperar conta</h1>
                    {(resetCode && isValidCode) || (usuario && usuario.status === "0") ? (
                        <>
                            <div className="w-full flex flex-col items-start">
                                <label className="p-title w-full text-left">Nova Senha</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full mb-2 pl-3 py-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none rounded"
                                    autoComplete="new-password"
                                />
                            </div> 
                            <div className="w-full flex flex-col items-start">
                                <label className="p-title w-full text-left mb-1">Confirme a Nova Senha</label>
                                <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full pl-3 py-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none rounded"
                                    autoComplete="new-password"
                                />
                            </div>
                            {error && <p className="error text-red-500 text-sm">{error}</p>}
                            <button
                                type={"submit"}
                                value={"Submit"}
                                onClick={sendEmail}
                                className={`border-none transition text-lg mt-2 px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${"bg-highlight"/*error ? "bg-red hover:bg-secondary hover:text-red" : "bg-highlight hover:bg-primary"*/}`}
                                //disabled={loading}
                                aria-label="Avançar"
                            >
                                <i className="bi bi-feather2 left"></i>
                                Enviar
                                {/* {loading ? `Carregando${loadingDots}` : error ? error : "Iniciar"} */}
                                <i className="bi bi-feather2 right"></i>
                        </button>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-col items-start">
                                <label className="p-title w-full text-left mb-0">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-3 py-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none rounded"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="w-full flex flex-col items-start">
                                <label className="p-title w-full text-left mb-0">Insira o email novamente</label>
                                <input
                                    type="email"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    className="w-full pl-3 py-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none rounded"
                                    autoComplete="email"
                                />
                            </div>
                            {error && <p className="error text-red-500 text-sm">{error}</p>}
                            <button
                                type={"submit"}
                                value={"Submit"}
                                onClick={sendEmail}
                                className={`border-none transition text-lg mt-2 px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${"bg-highlight"/*error ? "bg-red hover:bg-secondary hover:text-red" : "bg-highlight hover:bg-primary"*/}`}
                                //disabled={loading}
                                aria-label="Avançar"
                            >
                                <i className="bi bi-feather2 left"></i>
                                Enviar
                                {/* {loading ? `Carregando${loadingDots}` : error ? error : "Iniciar"} */}
                                <i className="bi bi-feather2 right"></i>
                        </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
