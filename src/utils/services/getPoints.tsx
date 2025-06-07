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
    API_URL: string,
    signal?: AbortSignal
): Promise<PontoProcessado[]> {
    try {
        let data: Ponto[];

        if (todayBool) {
            const today = new Date();
            const todayTimestamp = today.toISOString();
            
            const response = await axios.get<Ponto[]>(`${API_URL}ponto/filtro`, {
                params: {
                    cpf: cpf,
                    dia: todayTimestamp
                },
                signal: signal,
            });
            data = response.data;
        } else {
            const response = await axios.get<Ponto[]>(`${API_URL}ponto`, {
                signal: signal,
            });
            data = response.data;
        }

        if (!Array.isArray(data)) {
            console.error("Resposta inesperada da API:", data);
            return [];
        }

        return data
            .filter(ponto => {
                if (!todayBool) {
                    return ponto.funcionario_fk && ponto.funcionario_fk === cpf;
                }
                return ponto.funcionario_fk && ponto.funcionario_fk === cpf;
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