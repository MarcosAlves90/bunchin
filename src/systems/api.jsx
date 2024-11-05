import axios from "axios";

export async function getPoints(cpf, todayBool) {
    try {
        const { data } = await axios.get(`https://7zbcjxjz.infinityfree.com/api/ponto/`);
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
                data: new Date(ponto.data_hora)
            }));
    } catch (error) {
        console.error("Error loading points of the day:", error);
        return [];
    }
}