import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export default function Login() {

    const { tema } = useContext(UserContext);

    return (
        <div className={`login-form ${tema}`}>
            <div className="left-side">
                <h2 className={"left-side-h2"}>Não Possui um Cadastro?</h2>
                <img className={"left-side-crow"} src="/login_crow.svg" alt="" />
                <p className={"left-side-p"}>Entre em contato com o departamento pessoal da sua
                    empresa para que eles criem seu acesso.</p>
            </div>
            <div className={"right-side"}>
                <img className={"title-sessao"} src="/iniciando_sessao_title.svg" alt=""/>
                <label htmlFor="email">email ou cpf</label>
                <input type="text" id="email" placeholder="email ou cpf"/>
                <label htmlFor="senha">senha</label>
                <input type="text" id="senha" placeholder="senha"/>

                <button>
                    <i className="bi bi-feather2"></i>
                    entrar
                    <i className="bi bi-feather2"></i>
                </button>
            </div>
        </div>
    )
}