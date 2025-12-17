import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const questionApi = {
    getAll: () => api.get('/questions'),
    add: (data: any) => api.post('/questions', data),
};

export const examApi = {
    generate: (data: any) => api.post('/exams/generate', data),
};

export const evaluatorApi = {
    submit: (data: any) => api.post('/evaluator/submit', data),
};

export const aiApi = {
    ask: (data: any) => api.post('/ai/ask', data),
};

export default api;
