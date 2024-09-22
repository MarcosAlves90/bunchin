import {useContext, useEffect, useState} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Administrador() {

    const navigate = useNavigate();

    const [funcionarios, setFuncionarios] = useState(["Logan Sanders", "Arimo"]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");

    const { tema } = useContext(UserContext);

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/api/user/save', inputs).then(function(response){
            console.log(response.data);
        });
        
    }

    function GenerateEmployeesButtons({funcionarios}) {

        return (
            <article className={"article-employees"}>
                {funcionarios.map(funcionario => (
                    <div key={funcionario} className={`employee-item ${funcionarioSelecionado === funcionario ? "ativo" : ""}`}
                         onClick={handleEmployeeButtonClick(funcionario)}>
                        <p className={"nome"}>{funcionario}</p>
                    </div>
                ))}
            </article>
        )

    }

    GenerateEmployeesButtons.propTypes = {
        funcionarios: PropTypes.array.isRequired,
    }

    function handleEmployeeButtonClick(funcionario) {
        return () => {
            setFuncionarioSelecionado(funcionario);
        }
    }

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
                <GenerateEmployeesButtons funcionarios={funcionarios}/>
            </article>
            <article className={"page"}>
                <div className={"div-title"}>
                    <h1 className={"title"}>
                        DADOS DO PERFIL
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <article className={"article-inputs"}>
                        <div className={"article-inputs-input nome"}>
                            <label>NOME COMPLETO</label>
                            <input placeholder={"exemplo da silva paiva"} type={"text"} name={"nome"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input email"}>
                            <label>EMAIL</label>
                            <input placeholder={"exemplo@gmail.com"} type={"email"} name={"email"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input n-registro"}>
                            <label>REGISTRO</label>
                            <input placeholder={"1234567890"} type={"number"} name={"n_registro"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input senha"}>
                            <label>SENHA</label>
                            <input placeholder={"senhasegura1234"} type={"password"} name={"senha"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input cpf"}>
                            <label>CPF</label>
                            <input placeholder={"123.456.789-00"} type={"number"} name={"cpf"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input funcao"}>
                            <label>FUNÇÃO</label>
                            <select defaultValue={"comum"} name={"funcao"} onLoad={handleChange} onChange={handleChange}>
                                <option value={"comum"}>Comum</option>
                                <option value={"administrador"}>Administrador</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input cargo"}>
                            <label>CARGO</label>
                            <select defaultValue={"estagiario"} name={"cargo"} onLoad={handleChange} onChange={handleChange}>
                                <option value={"estagiario"}>Estagiário</option>
                                <option value={"auxiliar-administrativo"}>Auxiliar administrativo</option>
                                <option value={"gerente"}>Gerente</option>
                                <option value={"diretor"}>Diretor</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input departamento"}>
                            <label>DEPARTAMENTO</label>
                            <select defaultValue={"administrativo"} name={"departamento"} onLoad={handleChange} onChange={handleChange}>
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
                </form>
            </article>
        </main>
    )
}