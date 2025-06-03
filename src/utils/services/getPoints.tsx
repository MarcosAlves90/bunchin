import axios from "axios";

interface Ponto {
    id_ponto: string;
    data_hora: string;
    nome_tipo: string;
    funcionario_fk: string;
}

interface PontoProcessado {
    nome: string;
    id: string;
    data: Date;
    funcionario_fk: string;
}

export async function getPoints(
    cpf: string,
    todayBool: boolean,
    API_URL: string
): Promise<PontoProcessado[]> {
    try {
        const { data } = await axios.get<Ponto[]>(`${API_URL}ponto`);
        if (!Array.isArray(data)) {
            console.error("Resposta inesperada da API:", data);
            return [];
        }

        const today = new Date();
        return data
            .filter(ponto => {
                const pointDate = new Date(ponto.data_hora);
                return (todayBool ? pointDate.toDateString() === today.toDateString() : true) &&
                    ponto.funcionario_fk && ponto.funcionario_fk === cpf;
            })
            .map(ponto => ({
                nome: ponto.nome_tipo,
                id: ponto.id_ponto,
                data: new Date(ponto.data_hora),
                funcionario_fk: ponto.funcionario_fk ? ponto.funcionario_fk : ''
            }));
    } catch (error) {
        console.error("Erro ao carregar os registros:", error);
        return [];
    }
}