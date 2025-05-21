import axios from "axios";

export async function getPoints(cpf, todayBool, API_URL) {
    try {
<<<<<<< HEAD
        const { data } = await axios.get(`${API_URL}ponto`);
=======
        const { data } = await axios.get(`${API_URL}ponto/`);
>>>>>>> 9438f44 (feat: Add main application pages and user context management)
        if (!Array.isArray(data)) {
            console.error("Unexpected API response:", data);
            return [];
        }

        const today = new Date();
        return data
            .filter(ponto => {
                const pointDate = new Date(ponto.data_hora);
<<<<<<< HEAD
                return (todayBool ? pointDate.toDateString() === today.toDateString() : true) && ponto.funcionario_fk.cpf === cpf;
=======
                return (todayBool ? pointDate.toDateString() === today.toDateString() : true) && ponto.funcionario_fk === cpf;
>>>>>>> 9438f44 (feat: Add main application pages and user context management)
            })
            .map(ponto => ({
                nome: ponto.nome_tipo,
                id: ponto.id_ponto,
                data: new Date(ponto.data_hora),
<<<<<<< HEAD
                funcionario_fk: ponto.funcionario_fk.cpf
=======
                funcionario_fk: ponto.funcionario_fk
>>>>>>> 9438f44 (feat: Add main application pages and user context management)
            }));
    } catch (error) {
        console.error("Error loading points of the day:", error);
        return [];
    }
}