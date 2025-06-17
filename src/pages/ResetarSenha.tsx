import { useState, useEffect, useContext } from "react";
import validator from "validator";
import { SendEmail } from "../utils/services/sendEmail";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { UserContext } from "../utils/context/userContext";
import { useNavigate } from "react-router-dom";
import useLoadingDots from "../utils/hooks/useLoadingDots";
import { ArrowLeft } from "lucide-react";

export default function ResetarSenha() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [resetCode, setResetCode] = useState<string | null>(null);
    const [isValidCode, setIsValidCode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCrackTime, setPasswordCrackTime] = useState({ entropy: 0, time: "", timeSeconds: 0, strength: 0 });
    const [loadingSendEmail, setLoadingSendEmail] = useState(false);
    const [loadingChangePassword, setLoadingChangePassword] = useState(false);
    const [loadingVerifyCode, setLoadingVerifyCode] = useState(false);
    const { tema, usuario, setUsuario, API_URL } = useContext(UserContext);
    const loadingDots = useLoadingDots(loadingSendEmail || loadingChangePassword || loadingVerifyCode);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('codigo');
        if (code) {
            setResetCode(code);
            verifyResetCode(code);
        }
    }, []);    const verifyResetCode = async (codigo: string) => {
        setLoadingVerifyCode(true);
        try {
            const { data } = await axios.post(`${API_URL}verifyResetCode`, { codigo });
            if (data && data.valid) {
                setIsValidCode(true);
            } else {
                setError("Código inválido.");
            }
        } catch (error) {
            setError("Erro ao verificar o código.");
        } finally {
            setLoadingVerifyCode(false);
        }
    };

    const checkEmailExists = async (email: string) => {
        try {
            const { data } = await axios.post(`${API_URL}checkEmailExists`, { email });
            return data && Object.keys(data).length > 0;
        } catch (error) {
            return false;
        }
    };

    const storeResetCode = async (email: string, code: string) => {
        const { data } = await axios.post(`${API_URL}checkEmailExists`, { email });
        const { n_registro: funcionarioId, nome: funcionarioNome } = data;
        const responseLink = await axios.post(`${API_URL}storeResetCode`, {
            email, codigo: code, funcionario: {n_registro: funcionarioId}
        });
        return { ok: responseLink.status === 200, nome: funcionarioNome };
    };
    const sendEmail = async () => {
        if (email !== confirmEmail) return setError("Os emails não coincidem.");
        const normalizedEmail = validator.normalizeEmail(email);
        if (!normalizedEmail || !validator.isEmail(normalizedEmail)) return setError("Email inválido.");

        setLoadingSendEmail(true);
        setError("");

        try {
            const emailExists = await checkEmailExists(email);
            if (!emailExists) {
                setError("Email não encontrado.");
                return;
            }

            const resetCode = uuidv4();
            const { ok: codeStored, nome: funcionarioNome } = await storeResetCode(email, resetCode);
            if (!codeStored) {
                setError("Erro ao gerar o código de redefinição.");
                return;
            }

            const resetLink = `${window.location.href}?codigo=${resetCode}`;
            await SendEmail(
                // @ts-ignore
                import.meta.env.VITE_PUBLIC_API_KEY_S,
                // @ts-ignore
                import.meta.env.VITE_SERVICE_API_KEY_S,
                // @ts-ignore
                import.meta.env.VITE_TEMPLATE_API_KEY_2_S, {
                email, link: resetLink, name: funcionarioNome
            });
            
            setError("Email enviado com sucesso! Verifique sua caixa de entrada.");
        } catch (error) {
            setError("Erro ao enviar email.");
        } finally {
            setLoadingSendEmail(false);
        }
    };    const calculatePasswordCrackTime = (password: string) => {
        if (!password) return { entropy: 0, time: "", timeSeconds: 0, strength: 0 };

        let charset = 0;
        if (/[a-z]/.test(password)) charset += 26;
        if (/[A-Z]/.test(password)) charset += 26;
        if (/[0-9]/.test(password)) charset += 10;
        if (/[^A-Za-z0-9]/.test(password)) charset += 32;

        const entropy = password.length * Math.log2(charset);
        
        const attemptsPerSecond = 10_000_000_000;
        
        const timeSeconds = Math.pow(2, entropy) / 2 / attemptsPerSecond;
        
        let timeString = "";
        let strength = 0;
        
        if (timeSeconds < 3600) {
            timeString = timeSeconds < 1 ? "< 1 segundo" : 
                        timeSeconds < 60 ? `${Math.round(timeSeconds)} segundos` :
                        `${Math.round(timeSeconds / 60)} minutos`;
            strength = 1;
        } else if (timeSeconds < 2628000) {
            timeString = timeSeconds < 86400 ? `${Math.round(timeSeconds / 3600)} horas` :
                        `${Math.round(timeSeconds / 86400)} dias`;
            strength = 2;
        } else if (timeSeconds < 31536000) {
            timeString = `${Math.round(timeSeconds / 2628000)} meses`;
            strength = 3;
        } else {
            timeString = timeSeconds < 315360000 ? `${Math.round(timeSeconds / 31536000)} anos` : "séculos";
            strength = 4;
        }

        return { entropy, time: timeString, timeSeconds, strength };
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

        setLoadingChangePassword(true);
        setError("");

        const n_registro = usuario && usuario.status === "0" ? usuario.n_registro : null;
        const apiEndpoint = usuario && usuario.status === "0" ? 'newPassword' : 'resetPassword';
        const payload = usuario && usuario.status === "0"
            ? { n_registro, senha: newPassword }
            : { codigo: resetCode, senha: newPassword };

        try {
            const response = await axios.put(`${API_URL}${apiEndpoint}`, payload);
            if (response.status === 200) {
                setError("Senha alterada com sucesso.");
                setTimeout(() => {
                    if (usuario && usuario.status === "0") {
                        navigate("/pontos");
                    } else {
                        handleLogout();
                    }
                }, 1500);
            } else {
                setError("Erro ao alterar a senha.");
            }
        } catch (err) {
            setError("Erro ao alterar a senha. Tente novamente.");
        } finally {
            setLoadingChangePassword(false);
        }
    };    useEffect(() => {
        const result = calculatePasswordCrackTime(newPassword);
        setPasswordStrength(result.strength);
        setPasswordCrackTime(result);
    }, [newPassword]);
    const getPasswordStrengthColor = () => {
        if (tema === "dark") {
            switch (passwordStrength) {
                case 4:
                    return "green";
                case 3:
                    return "lime";
                case 2:
                    return "yellow";
                case 1:
                    return "red";
                default:
                    return "gray";
            }
        } else {
            switch (passwordStrength) {
                case 4:
                    return "darkgreen";
                case 3:
                    return "green";
                case 2:
                    return "var(--color-highlight)";
                case 1:
                    return "darkred";
                default:
                    return "gray";
            }
        }
    };
    if (resetCode && !isValidCode) {
        if (loadingVerifyCode) {
            return (
                <main className="mainCommon flex items-center justify-center !max-w-60">
                    <div className="cardBox bg-tertiary p-2 w-full rounded-sm flex flex-col items-center justify-center">
                        <h1 className="text-xl">Verificando código{loadingDots}</h1>
                    </div>
                </main>
            );
        }
        return <h1>404 - Código inválido</h1>;
    }

    const handleBackButtonClick = () => navigate("/login");
    return (
        <>
            <main className={`mainCommon flex items-center justify-center !max-w-60`}>
                <div className="cardBox bg-tertiary p-2 w-full rounded-sm flex flex-col items-center justify-center relative text-primary">
                    <button className={"absolute bg-secondary p-1 rounded-sm border-4 border-tertiary left-1 top-[-2rem] cursor-pointer"} onClick={handleBackButtonClick}>
                        <ArrowLeft size={30} />
                    </button>
                    <h1 className="text-3xl font-subrayada font-bold mb-2">
                        {usuario && usuario.status === "0" ? "Definir senha" : "Recuperar conta"}
                    </h1>
                    {(resetCode && isValidCode) || (usuario && usuario.status === "0") ? (
                        <div className="wrapper flex flex-col gap-2 max-w-30 w-full items-center justify-center">
                            <div className="flex flex-col items-start w-full">
                                <p className={"uppercase"}>Nova Senha</p>
                                <input
                                    className="w-full border-b-2 p-0.5 rounded-t-sm focus:border-highlight bg-secondary text-primary border-primary"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Digite a nova senha"
                                />
                                <div className="w-full flex gap-0.5 mt-1">
                                    {Array.from({ length: 4 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="h-0.5 flex-1 transition-all duration-300"
                                            style={{
                                                backgroundColor:
                                                    newPassword && passwordStrength > i
                                                        ? getPasswordStrengthColor()
                                                        : "var(--color-card)"
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="text-base mt-0.5 w-full" style={{ 
                                    color: newPassword ? getPasswordStrengthColor() : tema === "dark" ? "#888" : "#666" 
                                }}>
                                    {newPassword ? (
                                        `Tempo para quebrar: ${passwordCrackTime.time}`
                                    ) : 'Aguardando senha...'}
                                </p>
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <p className={"uppercase"}>Confirme a Nova Senha</p>
                                <input
                                    className="w-full border-b-2 p-0.5 rounded-t-sm focus:border-highlight bg-secondary text-primary border-primary"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    placeholder="Confirme a nova senha"
                                />
                            </div>
                            <button
                                className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${
                                    loadingChangePassword ? "bg-gray-400 cursor-not-allowed pointer-events-none" :
                                    error && error.includes("sucesso") ? "bg-green hover:bg-green-600" :
                                    error ? "bg-red hover:bg-secondary hover:text-red" :
                                    "bg-highlight hover:bg-primary"
                                }`}
                                onClick={handlePasswordChange}
                                disabled={loadingChangePassword}
                            >
                                {loadingChangePassword ? `Carregando${loadingDots}` :
                                error && error.includes("sucesso") ? "Sucesso!" :
                                error ? error : "Redefinir senha"}
                            </button>
                        </div>
                    ) : (
                        <div className="wrapper flex flex-col gap-2 max-w-30 w-full items-center justify-center">
                            <div className="flex flex-col items-start w-full">
                                <p className={"uppercase"}>Email</p>
                                <input
                                    className="w-full border-b-2 p-0.5 rounded-t-sm focus:border-highlight bg-secondary text-primary border-primary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite seu email"
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <p className={"uppercase"}>Insira o email novamente</p>
                                <input
                                    className="w-full border-b-2 p-0.5 rounded-t-sm focus:border-highlight bg-secondary text-primary border-primary"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    placeholder="Confirme seu email"
                                />
                            </div>
                            <button 
                                className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${
                                    loadingSendEmail ? "bg-gray-400 cursor-not-allowed pointer-events-none" :
                                    error && error.includes("sucesso") ? "bg-green hover:bg-green-600" :
                                    error ? "bg-red hover:bg-secondary hover:text-red" : 
                                    "bg-highlight hover:bg-primary"
                                }`} 
                                onClick={sendEmail}
                                disabled={loadingSendEmail}
                            >
                                {loadingSendEmail ? `Enviando${loadingDots}` : 
                                error && error.includes("sucesso") ? "Email enviado!" : 
                                error ? error : "Enviar"}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}