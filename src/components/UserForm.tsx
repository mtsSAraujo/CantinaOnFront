import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {handleApiError} from "../utils/handleApiError.ts";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { token } = useSelector((state: RootState) => state.auth);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState<"ADMINISTRADOR" | "CLIENTE">("CLIENTE");
    const [status, setStatus] = useState<"ATIVO" | "INATIVO">("ATIVO");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setError("");
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = res.data;
                setNome(data.nome);
                setEmail(data.email);
                setTipoUsuario(data.tipoUsuario);
                setStatus(data.status);
            } catch (err: any) {
                setError(handleApiError(err));
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const payload = { nome, email, senha, tipoUsuario, status };

        try {
            await axios.put(`http://localhost:8080/api/user/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Usuário atualizado com sucesso!");
            navigate("/users");
        } catch (err: any) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Editar Usuário</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select
                        className="form-select"
                        value={tipoUsuario}
                        onChange={(e) =>
                            setTipoUsuario(e.target.value as "ADMINISTRADOR" | "CLIENTE")
                        }
                        required
                    >
                        <option value="ADMINISTRADOR">Administrador</option>
                        <option value="CLIENTE">Cliente</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status do Usuário</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as "ATIVO" | "INATIVO" )
                        }
                        required
                    >
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
