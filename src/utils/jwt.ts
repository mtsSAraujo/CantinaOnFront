// utils/jwt.ts
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Defina a estrutura do seu payload (personalize conforme seu token)
export interface CustomJwtPayload extends JwtPayload {
    sub: string;
    roles: string[];
    iat: number;
    exp: number;
}

export const decodeJwt = (token: string): CustomJwtPayload | null => {
    try {
        return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
};