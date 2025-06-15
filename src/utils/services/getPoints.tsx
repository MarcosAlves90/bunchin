import axios from "axios";
import { Ponto, PontoProcessado } from "../../types/interfaces";

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