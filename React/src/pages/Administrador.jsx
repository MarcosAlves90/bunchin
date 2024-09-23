import {useContext, useEffect, useState} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import {GeneratePoints} from "../systems/PointSystems.jsx";

export default function Administrador() {

    const [indexFuncionario, setindexFuncionario] = useState(0);

    // Pegar do banco de dados os registros
    const [registros, setRegistros] = useState([]);

    const [funcionarios, setFuncionarios] = useState([]);
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

        if (funcionarioSelecionado) {
            axios.put(`http://localhost:80/api/user/${funcionarioSelecionado}/edit`, inputs).then(function(response){
                console.log(response.data);
            });
        } else {
            axios.post('http://localhost:80/api/user/save', inputs).then(function(response){
                console.log(response.data);
            });
        }

        
    }

    useEffect(() => {
        getUsers();

        const defaultValues = {
            n_registro: "",
            nome: "",
            email: "",
            senha: "",
            cpf: "",
            funcao: "comum",
            cargo: "estagiario",
            departamento: "administrativo"
        };

        for (const [name, value] of Object.entries(defaultValues)) {
            handleChange({ target: { name, value } });
        }
    }, []);

    function getUsers() {
        axios.get(`http://localhost:80/api/users/`).then(function(response) {
            console.log(response.data);
            setFuncionarios(response.data);
        });
    }

    const deleteUser = (cpf) => {
        axios.delete(`http://localhost:80/api/user/${cpf}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }

    function GenerateEmployeesButtons({funcionarios}) {

        return (
            <article className={"article-employees"}>
                {funcionarios.map(funcionario => (
                    <div key={funcionario.cpf} className={`employee-item ${funcionarioSelecionado === funcionario.nome ? "ativo" : ""}`}
                         onClick={() => handleEmployeeButtonClick(funcionario)}>
                        <p className={"nome"}>{funcionario.nome}</p>
                    </div>
                ))}
            </article>
        )

    }

    GenerateEmployeesButtons.propTypes = {
        funcionarios: PropTypes.array.isRequired,
    }

    function handleEmployeeButtonClick(funcionario) {
        setFuncionarioSelecionado(funcionario.cpf);
        setindexFuncionario(funcionarios.findIndex(f => f.cpf === funcionario.cpf));
    }

    useEffect(() => {
        if (funcionarioSelecionado) {
            setInputs(funcionarios[indexFuncionario]);
        }
    }, [funcionarioSelecionado]);

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
                            <input value={inputs.nome || ""} placeholder={"exemplo da silva paiva"} type={"text"} name={"nome"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input email"}>
                            <label>EMAIL</label>
                            <input value={inputs.email || ""} placeholder={"exemplo@gmail.com"} type={"email"} name={"email"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input n-registro"}>
                            <label>REGISTRO</label>
                            <input value={inputs.n_registro || ""} placeholder={"1234567890"} type={"number"} name={"n_registro"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input senha"}>
                            <label>SENHA</label>
                            <input value={inputs.senha || ""} placeholder={"senhasegura1234"} type={"text"} name={"senha"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input cpf"}>
                            <label>CPF</label>
                            <input value={inputs.cpf || ""} placeholder={"123.456.789-00"} type={"number"} name={"cpf"} onChange={handleChange}></input>
                        </div>
                        <div className={"article-inputs-input funcao"}>
                            <label>FUNÇÃO</label>
                            <select value={inputs.funcao} defaultValue={"comum"} name={"funcao"} onChange={handleChange}>
                                <option value={"comum"}>Comum</option>
                                <option value={"administrador"}>Administrador</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input cargo"}>
                            <label>CARGO</label>
                            <select value={inputs.cargo} defaultValue={"estagiario"} name={"cargo"} onChange={handleChange}>
                                <option value={"estagiario"}>Estagiário</option>
                                <option value={"auxiliar-administrativo"}>Auxiliar administrativo</option>
                                <option value={"gerente"}>Gerente</option>
                                <option value={"diretor"}>Diretor</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input departamento"}>
                            <label>DEPARTAMENTO</label>
                            <select value={inputs.departamento} defaultValue={"administrativo"} name={"departamento"} onChange={handleChange}>
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
                <button onClick={() => deleteUser(funcionarioSelecionado)}>Delete</button>
                <GeneratePoints registros={registros}/>
            </article>
        </main>
    )
}