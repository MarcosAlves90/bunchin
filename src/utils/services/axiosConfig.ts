import axios from 'axios';

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (
            error.response?.status === 502 && 
            originalRequest.method?.toLowerCase() === 'get'
        ) {
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
    
            if (originalRequest._retryCount <= 3) {
                console.warn(`Erro 502 detectado em GET. Tentativa ${originalRequest._retryCount}/3...`);
                
                await new Promise(resolve => 
                    setTimeout(resolve, 2000 * originalRequest._retryCount)
                );
                
                return axios(originalRequest);
            }
        }
        
        return Promise.reject(error);
    }
);
