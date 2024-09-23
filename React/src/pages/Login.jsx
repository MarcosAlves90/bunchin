import { useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const { tema, usuario, setUsuario } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if (usuario) {
            navigate('/pontos');
        }
    }, []);

    const handleLoginButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:80/api/login', { email, senha });
            if (response.data.status === 1) {
                // Sucesso: redirecionar para a página de pontos
                setUsuario(response.data.funcionario);
                localStorage.setItem("usuario", JSON.stringify(response.data.funcionario));
                navigate('/pontos');
            } else {
                // Falha: mostrar mensagem de erro
                setError(response.data.message);
            }
        } catch (error) {
            console.error("There was an error with the login request:", error);
            setError("Erro ao tentar fazer login. Por favor, tente novamente.");
        }
    };

    return (
        <div className={`login-form ${tema}`}>
            <img className={"penas-left"}
                 src={"/penas_esquerda_login.svg"}
                 alt={"Penas à esquerda"}/>
            <img className={"penas-right"}
                 src={"/penas_direita_login.svg"}
                 alt={"Penas à direita"}/>
            <div className="left-side">
                <h2 className={"left-side-h2"}>Não Possui um Cadastro?</h2>
                <img className={"left-side-crow"} src="/login_crow.svg" alt=""/>
                <p className={"left-side-p"}>Entre em contato com o departamento pessoal da sua
                    empresa para que eles criem seu acesso.</p>
            </div>
            <div className={"right-side"}>
                <img className={"title-sessao"} src="/iniciando_sessao_title.svg" alt=""/>
                <label htmlFor="email">EMAIL OU CPF</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email ou CPF"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="senha">SENHA</label>
                <input
                    type="password"
                    id="senha"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button className="button-login" onClick={handleLoginButtonClick}>
                    <i className="bi bi-feather2 left"></i>
                    Iniciar
                    <i className="bi bi-feather2 right"></i>
                </button>
            </div>
        </div>
    );
}