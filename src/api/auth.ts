import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // O backend deve retornar o token JWT aqui
    } catch (error: any) {
        throw error.response?.data?.message || "Erro ao tentar fazer login.";
    }
};
