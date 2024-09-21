import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const { tema } = useContext(UserContext);

    function handleLoginButtonClick() {
        navigate('/registros');
    }

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
                <input type="text" id="email" placeholder="email ou cpf"/>
                <label htmlFor="senha">SENHA</label>
                <input type="password" id="senha" placeholder="senha"/>

                <button className="button-login" onClick={handleLoginButtonClick}>
                    <i className="bi bi-feather2 left"></i>
                    Iniciar
                    <i className="bi bi-feather2 right"></i>
                </button>
            </div>
        </div>
    )
}