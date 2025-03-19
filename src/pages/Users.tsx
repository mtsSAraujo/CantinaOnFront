// pages/Users.tsx
import { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserService } from '../services/userService'; // Caminho corrigido
import { UsuarioResponseDto } from '../services/userService';

const Users = () => {
    const navigate = useNavigate();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [users, setUsers] = useState<UsuarioResponseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Verificação de segurança
        if (!token || !user?.roles.includes('ROLE_ADMINISTRADOR')) {
            navigate('/');
            return;
        }

        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getUsers();
                setUsers(usersData);
            } catch (err) {
                if(typeof err === 'string') {
                    setError(err);
                } else {
                    setError('Erro ao carregar usuários. Tente novamente mais tarde.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate, token, user]); // Dependências corretas

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Gerenciamento de Usuários</h1>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo de Usuário</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {users.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.tipoUsuario}</td>
                        <td>{usuario.status}</td>
                        <td>
                            <Button variant="outline-primary" size="sm" className="me-2">
                                Editar
                            </Button>
                            <Button variant="outline-danger" size="sm">
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;