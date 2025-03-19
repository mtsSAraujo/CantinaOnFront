// src/api/userService.ts
import api from "../api/api";

// Interface para tipar a resposta
export interface UsuarioResponseDto {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: string;
    status: string;
}

// Função para buscar usuários
export const UserService = {
    getUsers: async (): Promise<UsuarioResponseDto[]> => {
        try {
            const response = await api.get("/user");
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Erro ao carregar usuários");
            }
        }
    },

    // Adicione outras funções conforme necessário
    // createUser, updateUser, etc...
};