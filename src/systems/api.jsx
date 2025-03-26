import axios from "axios";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";


export async function getPoints(cpf, todayBool) {
    const { API_URL } = useContext(UserContext);
    try {
        const { data } = await axios.get(`${API_URL}ponto/`);
        if (!Array.isArray(data)) {
            console.error("Unexpected API response:", data);
            return [];
        }

        const today = new Date();
        return data
            .filter(ponto => {
                const pointDate = new Date(ponto.data_hora);
                return (todayBool ? pointDate.toDateString() === today.toDateString() : true) && ponto.funcionario_fk === cpf;
            })
            .map(ponto => ({
                nome: ponto.nome_tipo,
                id: ponto.id_ponto,
                data: new Date(ponto.data_hora),
                funcionario_fk: ponto.funcionario_fk
            }));
    } catch (error) {
        console.error("Error loading points of the day:", error);
        return [];
    }
}