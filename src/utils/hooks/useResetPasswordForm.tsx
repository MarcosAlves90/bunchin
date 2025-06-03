import axios from "axios";
import { useState, useEffect } from "react";

export function useResetPasswordForm(API_URL, usuario, setUsuario, navigate) {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [resetCode, setResetCode] = useState(null);
    const [isValidCode, setIsValidCode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(newPassword));
    }, [newPassword]);

    const checkEmailExists = async (email) => {
        try {
            const { data } = await axios.post(`${API_URL}checkEmailExists`, { email });
            return data && Object.keys(data).length > 0;
        } catch (error) {
            return false;
        }
    };

    const storeResetCode = async (email, code) => {
        const { data } = await axios.post(`${API_URL}checkEmailExists`, { email });
        const { n_registro: funcionarioId, nome: funcionarioNome } = data;
        const responseLink = await axios.post(`${API_URL}storeResetCode`, {
            email, codigo: code, funcionario_id: funcionarioId
        });
        return { ok: responseLink.status === 200, nome: funcionarioNome };
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

    const getPasswordStrengthColor = (tema) => {
        if (tema === "dark") {
            switch (passwordStrength) {
                case 6: return "green";
                case 5: return "lime";
                case 4: return "yellow";
                case 3: return "orange";
                default: return "red";
            }
        } else {
            switch (passwordStrength) {
                case 6: return "darkgreen";
                case 5: return "green";
                case 4: return "gold";
                case 3: return "darkorange";
                default: return "darkred";
            }
        }
    };

    return {
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
        setPasswordStrength,
        checkEmailExists,
        storeResetCode,
        checkPasswordStrength,
        getPasswordStrengthColor,
    };
}
