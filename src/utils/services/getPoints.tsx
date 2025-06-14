import axios from "axios";

interface Ponto {
    id_ponto: string;
    data_hora: string;
    nome_tipo: string;
    funcionario_fk: number;
}

interface PontoProcessado {
    nome: string;
    id: string;
    data: Date;
    funcionario_fk: number;
}

export async function getPoints(
    funcionario_id: string,
    date: string,
    API_URL: string,
    signal?: AbortSignal
): Promise<PontoProcessado[]> {
    try {
        const response = await axios.get<Ponto[]>(`${API_URL}ponto/filtro`, {
            params: {
                funcionario_id: funcionario_id,
                dia: date
            },
            signal: signal,
        });
        
        const data = response.data;

        if (!Array.isArray(data)) {
            console.error("Resposta inesperada da API:", data);
            return [];
        }

        return data
            .filter(ponto => ponto.funcionario_fk && ponto.funcionario_fk === parseInt(funcionario_id))
            .map(ponto => ({
                nome: ponto.nome_tipo,
                id: ponto.id_ponto,
                data: new Date(ponto.data_hora),
                funcionario_fk: ponto.funcionario_fk
            }));
    } catch (error) {
        console.error("Erro ao carregar os registros:", error);
        return [];
    }
}