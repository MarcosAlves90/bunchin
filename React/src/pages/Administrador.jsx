import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export default function Administrador() {

    const { tema } = useContext(UserContext);

    return (
        <main className={`mainCommon administrador ${tema}`}>
            <article className={"sidebar"}>
                <div className={"div-title"}>
                    <p className={"title"}>Funcionários</p>
                </div>
                <div className={"div-search"}>
                    <input className={"search"}>

                    </input>
                </div>
            </article>
            <article className={"page"}>
                <div className={"div-title"}>
                    <h1 className={"title"}>
                        DADOS DO PERFIL
                    </h1>
                </div>
                <article className={"article-inputs"}>
                    <div className={"article-inputs-input nome"}>
                        <label>NOME COMPLETO</label>
                        <input placeholder={"exemplo da silva paiva"} type={"text"}></input>
                    </div>
                    <div className={"article-inputs-input email"}>
                        <label>EMAIL</label>
                        <input placeholder={"exemplo@gmail.com"} type={"email"}></input>
                    </div>
                    <div className={"article-inputs-input n-registro"}>
                        <label>Nº DE REGISTRO</label>
                        <input placeholder={"1234567890"} type={"number"}></input>
                    </div>
                    <div className={"article-inputs-input senha"}>
                        <label>SENHA</label>
                        <input placeholder={"senhasegura1234"} type={"password"}></input>
                    </div>
                    <div className={"article-inputs-input cpf"}>
                        <label>CPF</label>
                        <input placeholder={"123.456.789-00"} type={"number"}></input>
                    </div>
                    <div className={"article-inputs-input funcao"}>
                        <label>FUNÇÃO</label>
                        <select defaultValue={"comum"}>
                            <option value={"comum"}>Comum</option>
                            <option value={"administrador"}>Administrador</option>
                        </select>
                    </div>
                    <div className={"article-inputs-input cargo"}>
                        <label>CARGO</label>
                        <select defaultValue={"estagiario"}>
                            <option value={"estagiario"}>Estagiário</option>
                            <option value={"auxiliar-administrativo"}>Auxiliar administrativo</option>
                            <option value={"gerente"}>Gerente</option>
                            <option value={"diretor"}>Diretor</option>
                        </select>
                    </div>
                    <div className={"article-inputs-input departamento"}>
                        <label>DEPARTAMENTO</label>
                        <select defaultValue={"administrativo"}>
                            <option value={"administrativo"}>Administrativo</option>
                            <option value={"financeiro"}>Financeiro</option>
                            <option value={"marketing"}>Marketing</option>
                            <option value={"producao"}>Produção</option>
                        </select>
                    </div>
                </article>
                <div className={"container-save-button"}>
                    <button className={"save-button"}>Salvar alterações</button>
                </div>
            </article>
        </main>
    )
}